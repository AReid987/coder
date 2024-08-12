package cli

import (
	"fmt"

	"github.com/coder/coder/v2/cli/cliui"
	"github.com/coder/serpent"
	"github.com/coder/serpent/completion"
)

func (*RootCmd) completion() *serpent.Command {
	var shellName string
	var printOutput bool
	shellOptions := completion.ShellOptions(&shellName)
	return &serpent.Command{
		Use:   "completion",
		Short: "Install shell completion scripts for the detected shell.",
		Options: []serpent.Option{
			{
				Flag:          "shell",
				FlagShorthand: "s",
				Description:   "The shell to install completion for.",
				Value:         shellOptions,
			},
			{
				Flag:          "print",
				Description:   "Print the completion script instead of installing it.",
				FlagShorthand: "p",
				Value:         serpent.BoolOf(&printOutput),
			},
		},
		Handler: func(inv *serpent.Invocation) error {
			if shellName != "" {
				shell, err := completion.ShellByName(shellName, inv.Command.Parent.Name())
				if err != nil {
					return err
				}
				if printOutput {
					return shell.WriteCompletion(inv.Stdout)
				}
				return installCompletion(inv, shell)
			}
			shell, err := completion.DetectUserShell(inv.Command.Parent.Name())
			if err == nil {
				return installCompletion(inv, shell)
			}
			// Silently continue to the shell selection if detecting failed.
			choice, err := cliui.Select(inv, cliui.SelectOptions{
				Message: "Select a shell to install completion for:",
				Options: shellOptions.Choices,
			})
			if err != nil {
				return err
			}
			shellChoice, err := completion.ShellByName(choice, inv.Command.Parent.Name())
			if err != nil {
				return err
			}
			if printOutput {
				return shellChoice.WriteCompletion(inv.Stdout)
			}
			return installCompletion(inv, shellChoice)
		},
	}
}

func installCompletion(inv *serpent.Invocation, shell completion.Shell) error {
	path, err := shell.InstallPath()
	if err != nil {
		// If we can't determine the install path, just print the completion script.
		return shell.WriteCompletion(inv.Stdout)
	}
	action := "appending to"
	if shell.UsesOwnFile() {
		action = "creating"
	}
	choice, err := cliui.Select(inv, cliui.SelectOptions{
		Options: []string{
			"Confirm",
			"Print to terminal",
			"Cancel",
		},
		Message:    fmt.Sprintf("Install completion for %s by %s %s?", shell.Name(), action, path),
		HideSearch: true,
	})
	if err != nil {
		return err
	}
	if choice == "Cancel" {
		return nil
	}
	if choice == "Print to terminal" {
		return shell.WriteCompletion(inv.Stdout)
	}
	return completion.InstallShellCompletion(shell)
}

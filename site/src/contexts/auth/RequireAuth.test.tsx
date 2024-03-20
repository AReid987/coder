import { screen, renderHook } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import type { FC, PropsWithChildren } from "react";
import { QueryClientProvider } from "react-query";
import { vi, expect, describe, it } from "vitest";
import { MockPermissions, MockUser } from "testHelpers/entities";
import {
  renderWithAuth,
  createTestQueryClient,
} from "testHelpers/renderHelpers";
import { server } from "testHelpers/server";
import { AuthContext, type AuthContextValue } from "./AuthProvider";
import { useAuthenticated } from "./RequireAuth";

describe("RequireAuth", () => {
  it("redirects to /login if user is not authenticated", async () => {
    // appear logged out
    server.use(
      http.get("/api/v2/users/me", () => {
        return HttpResponse.json({ message: "no user here" }, { status: 401 });
      }),
    );

    renderWithAuth(<h1>Test</h1>, {
      nonAuthenticatedRoutes: [
        {
          path: "login",
          element: <h1>Login</h1>,
        },
      ],
    });

    await screen.findByText("Login");
  });
});

const createAuthWrapper = (override: Partial<AuthContextValue>) => {
  const value = {
    user: undefined,
    isLoading: false,
    isSignedOut: false,
    isSigningOut: false,
    isConfiguringTheFirstUser: false,
    isSignedIn: false,
    isSigningIn: false,
    isUpdatingProfile: false,
    permissions: undefined,
    authMethods: undefined,
    organizationId: undefined,
    signInError: undefined,
    updateProfileError: undefined,
    signOut: vi.fn(),
    signIn: vi.fn(),
    updateProfile: vi.fn(),
    ...override,
  };
  const Wrapper: FC<PropsWithChildren> = ({ children }) => {
    return (
      <QueryClientProvider client={createTestQueryClient()}>
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
      </QueryClientProvider>
    );
  };

  return Wrapper;
};

describe("useAuthenticated", () => {
  it("throws an error if it is used outside of a context with user", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      renderHook(() => useAuthenticated(), {
        wrapper: createAuthWrapper({ user: undefined }),
      });
    }).toThrow("User is not authenticated.");

    vi.restoreAllMocks();
  });

  it("throws an error if it is used outside of a context with permissions", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      renderHook(() => useAuthenticated(), {
        wrapper: createAuthWrapper({ user: MockUser }),
      });
    }).toThrow("Permissions are not available.");

    vi.restoreAllMocks();
  });

  it("returns auth context values for authenticated context", () => {
    expect(() => {
      renderHook(() => useAuthenticated(), {
        wrapper: createAuthWrapper({
          user: MockUser,
          permissions: MockPermissions,
        }),
      });
    }).not.toThrow();
  });
});

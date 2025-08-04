import { authService } from "@/services/authService";
import { LoginPayload, RegisterPayload } from "@/types/auth.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useRegister = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: (payload: RegisterPayload) => authService.register(payload),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (payload: LoginPayload) => authService.login(payload),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => authService.getMe(),
  });
};

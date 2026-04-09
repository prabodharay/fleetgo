
class AuthService {
  static String role = "customer";

  static login(String selectedRole) {
    role = selectedRole;
  }
}

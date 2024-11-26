package pe.edu.tecsup.learnai.rest.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class RecoverPasswordRequest {
    private String token;
    private String newPassword;
}

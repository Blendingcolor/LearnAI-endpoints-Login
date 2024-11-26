package pe.edu.tecsup.learnai.rest.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class VerificationRequest {
    private String token;

    public VerificationRequest() {}

    public VerificationRequest(String token) {
        this.token = token;
    }

}
package pe.edu.tecsup.learnai.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "username", unique = true, length = 100)
    private String username;
    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;
    @Column(name = "password", length = 255)
    private String password;
    @Column(name = "verification_token")
    private String verificationToken;
    @Column(name = "is_verified")
    private boolean isVerified;

    public User(String username, String email, String password, String verificationToken, boolean isVerified) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.verificationToken = verificationToken;
        this.isVerified = isVerified;
    }
}

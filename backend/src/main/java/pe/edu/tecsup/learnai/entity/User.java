package pe.edu.tecsup.learnai.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "users", uniqueConstraints = {
        @UniqueConstraint(columnNames = "username"),
        @UniqueConstraint(columnNames = "email")
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String username;
    private String email;
    private String password;
    private String verificationToken;
    private boolean isVerified;

    public User(String username, String email, String password, String verificationToken, boolean isVerified) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.verificationToken = verificationToken;
        this.isVerified = isVerified;
    }
}

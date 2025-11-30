import React, {useEffect, useState} from "react";
import {register} from "../api/auth";
import {useNavigate} from "react-router-dom";

const styles = {
    container: {
        display: 'flex',
        height: '50vh',
        width: '50vw',
        position: 'absolute',
        top: '25vh',
        left: '25vw',
        overflow: 'hidden',
        gap: '2rem',
        borderRadius: "0 25px 25px 0",
        backgroundColor: 'black',
        paddingLeft: '2rem',
    },

    formContainer: {
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        width: '40%',
        padding: '2rem 0',
    },

    heading: {
        color: 'white',
        marginBottom: '1rem',
        fontSize: '3rem',
    },

    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: "2vmin",
        height: "100%",
        overflow: 'hidden',
    },

    input: {
        backgroundColor: '#0c0c0c',
        width: "100%",
        boxSizing: "border-box",
        transition: "all 0.2s ease-in-out",
        appearance: "none",
        border: "none",
        borderRadius: "0.5rem",
        color: 'white',
        padding: '0.8rem 1rem',
        height: '5%',
        fontSize: '1rem',
    },

    inputPlaceholder: {
        color: 'white',
    },

    image: {
        flexGrow: 2,
        objectFit: "cover",
    },

    button: {
        padding: '0.8rem 1.5rem',
        marginTop: '1.5rem',
        backgroundColor: '#303030',
        color: '#fff',
        border: 'none',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        fontSize: '1.1rem',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        width: '122px',
    },

    buttonHover: {
        backgroundColor: '#fff',
        color: '#202020',

    }
};

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isHovering, setIsHovering] = useState(false);


    useEffect(() => {
        document.body.style.backgroundColor = 'linear-gradient(90deg, white, black)';
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    async function handleRegister(e) {
        e.preventDefault();

        try {
            const result = await register(username, email, password);
            navigate("/home");
            console.log("REGISTER OK:", result);
        } catch (error) {
            console.error("REGISTER ERROR:", error);
        }
    }

    const handleLogin = async e => {
        navigate("/");
    }

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h1 style={styles.heading}>Register</h1>
                <form onSubmit={handleRegister} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            ...styles.input,
                            ...styles.inputPlaceholder
                        }}
                    />

                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{
                            ...styles.input,
                            ...styles.inputPlaceholder
                        }}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            ...styles.input,
                            ...styles.inputPlaceholder
                        }}
                    />
                    <div style={{
                        marginTop: "auto",
                        display: "flex",
                        flexDirection: "row",
                    }}>
                        <button
                            type="submit"
                            style={{
                                ...styles.button,
                                ...(isHovering ? styles.buttonHover : {}), // Hover stílus alkalmazása
                            }}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            Register
                        </button>
                        <span
                            role="button"
                            tabIndex={0}
                            onClick={handleLogin}
                            style={{
                                color: "white",
                                cursor: "pointer"
                            }}
                        >
                        Login
                    </span>
                    </div>
                </form>
            </div>
            <img style={styles.image} src="/login-reg.jpg" />
        </div>
    );
}

export default Register;
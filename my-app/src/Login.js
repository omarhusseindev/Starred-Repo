import React, { useState } from 'react';


import Button from './components/Button';

const Login = () => {
    const [token, setToken] = useState('');
    return (
        <section>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    localStorage.setItem('token', token);
                    window.location.reload();
                }}
            >
                <h1>
                    Find my repo !
				</h1>
                <p>Please enter your Github personal token below</p>
                <input
                    type="password"
                    name="token"
                    value={token}
                    onChange={e => {
                        setToken(e.target.value);
                    }}
                    placeholder="Add Github token here"
                />
                <Button>SUBMIT</Button>
            </form>
        </section>
    );
};

export default Login;

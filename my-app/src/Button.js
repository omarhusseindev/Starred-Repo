
import styled from 'styled-components';

const Button = styled('button')({
    height: 36,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    transition: '0.3s ease-in-out',
    margin: '10px auto',
    boxShadow: 'inset 0px 1px 0px 0px #45D6D6',
    backgroundColor: '#2CBBBB',
    border: '1px solid #27A0A0',
    color: '#FFFFFF',
    fontFamily: '"Open Sans Condensed", "sans-serif"',
    fontSize: 14,
    padding: '8px 18px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    '&:hover, &:focus': {
        boxShadow: '2px 4px 6px 0px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
    },
});

export default Button;

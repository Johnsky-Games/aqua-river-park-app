export default {
  confirmAccount: (token) => {
	return `
	  <h3>Confirma tu cuenta</h3>
	  <p>Haz clic en el siguiente enlace para confirmar tu cuenta:</p>
	  <a href="http://localhost:5173/confirm/${token}">Confirmar cuenta</a>
	`;
  },

  resetPassword: (token) => {
	return `
	  <h3>Restablecer contraseña</h3>
	  <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
	  <a href="http://localhost:5173/reset-password/${token}">Cambiar contraseña</a>
	`;
  }
};
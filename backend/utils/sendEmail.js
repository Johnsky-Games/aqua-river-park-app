// 📁 backend/utils/sendEmail.js

export default {
	confirmAccount: (token) => `
	  <h3>Confirma tu cuenta</h3>
	  <p>Haz clic en el siguiente enlace para confirmar tu cuenta:</p>
	  <a href="http://localhost:5173/confirm/${token}" style="color:#00b1e8;">Confirmar cuenta</a>
	  <p>Este enlace expirará en 24 horas.</p>
	`,

	resetPassword: (token) => `
	  <h3>Restablecer contraseña</h3>
	  <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
	  <a href="http://localhost:5173/reset-password/${token}" style="color:#f26c1d;">Cambiar contraseña</a>
	  <p>Este enlace expirará en 1 hora.</p>
	`,

	freePass: (qrCode) => `
	  <h3>¡Has ganado un pase gratuito a Aqua River Park!</h3>
	  <p>Presenta este código QR en la entrada:</p>
	  <img src="${qrCode}" alt="Código QR de Pase Libre" style="max-width: 300px;" />
	  <p>¡Te esperamos para un día lleno de diversión!</p>
	`
};

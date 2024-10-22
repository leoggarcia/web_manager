import ReactConfetti from "react-confetti";
import { useNavigate } from "react-router-dom";

function SuccessPaymentPage() {
	const navigate = useNavigate();
	return (
		<div className="w-screen h-screen flex items-center justify-center flex-col gap-5 mt-[-66px] box-border">
			<h1 className="font-bold text-5xl">¡Pago exitoso!</h1>
			<p className="text-3xl">Gracias por tu compra</p>
			<button
				onClick={() => {
					navigate('/client');
				}}
				className="text-blue-500 underline cursor-pointer"
			>
				Regresar a mis sitios
			</button>

            <ReactConfetti />
		</div>
	);
}

export default SuccessPaymentPage;

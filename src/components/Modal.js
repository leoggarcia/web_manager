import { motion, useCycle } from 'framer-motion';
import { Children, cloneElement } from 'react';

function Modal({ children, open, setOpen, width }) {
	const [openAnimation, setOpenAnimation] = useCycle(true, false);

	const modalAnimations = {
		open: {
			opacity: 1,
			marginTop: '0vh',
			transition: {
				type: 'spring',
				bounce: 0,
				duration: 0.5,
				delayChildren: 0.7, // Retrasa la animación de los hijos
			},
		},
		closed: {
			opacity: 0,
			marginTop: '-100vh',
		},
	};
	const overlayAnimations = {
		open: {
			opacity: 0.5,
		},
		closed: {
			opacity: 0,
		},
	};

	function handleCloseModal() {
		/* const modal = document.getElementById('modal_content');
		modal.classList.remove('modal-fade-in');
		modal.classList.add('modal-fade-out');*/

		setOpenAnimation(false);
		setTimeout(() => {
			setOpen(false);
			setOpenAnimation(true);
		}, 500);
	}

	return (
		<div className="relative">
			{open && (
				<>
					{/* OVERLAY */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={openAnimation ? 'open' : 'closed'}
						transition={{ duration: 0.5 }}
						variants={overlayAnimations}
						onClick={() => {
							handleCloseModal();
						}}
						className="w-screen h-screen fixed top-0 right-0 z-0 bg-black opacity-50"
					></motion.div>
					{/* MODAL */}
					<motion.div
						id="modal_content"
						className="bg-[#EBEBEB] rounded-xl shadow-md fixed p-7 sm:p-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1 overflow-auto"
						style={{
							width: width ?? '500px',
							maxWidth: '90%',
							maxHeight: '90vh',
						}}
						initial={{ opacity: 0, marginTop: '-100vh' }}
						animate={openAnimation ? 'open' : 'closed'}
						variants={modalAnimations}
					>
						{Children.map(children, (child) =>
							cloneElement(child, { handleCloseModal }),
						)}
					</motion.div>
				</>
			)}
		</div>
	);
}

export default Modal;

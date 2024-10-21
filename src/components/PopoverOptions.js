import { useState, useRef, useEffect } from 'react';

function PopoverOptions({ options, buttonClassNames, children, position }) {
	const [isOpen, setIsOpen] = useState(false);
	const [topBottom, setTopBottom] = useState('top-0');
	const popoverRef = useRef();

	const togglePopover = () => {
		setIsOpen(!isOpen);
	};

	const handleClickOutside = (event) => {
		if (popoverRef.current && !popoverRef.current.contains(event.target)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (position === 'bottom') {
			setTopBottom('bottom-0');
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className="relative inline-block" ref={popoverRef}>
			<button onClick={togglePopover} className={buttonClassNames}>
				{children}
			</button>

			{isOpen && (
				<div
					className={
						topBottom +
						' absolute right-10 mt-2 w-40 bg-white shadow-lg rounded-md z-10'
					}
				>
					<ul className="py-1">
						{options.map((option, index) => (
							<li
								key={index}
								onClick={() => {
									option.onClick();
									setIsOpen(false);
								}}
								className="px-4 py-2 text-xs text-gray-700 border-b border-b-gray-200 last:border-none hover:bg-gray-100 cursor-pointer"
							>
								{option.text}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default PopoverOptions;

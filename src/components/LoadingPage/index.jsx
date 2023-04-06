import React from 'react';
// import "./loading.css";
// import "./loading.scss";

export default function Loading({ className, ...others }) {
	return (
		<>
			<style jsx="true">{`
				.content {
					width: 100vw;
					height: 100vh;
					display: flex;
					justify-content: center;
					align-items: center;
					background-color: #f5f5f5;
				}
				
				.flower {
					background-color: #f5f5f5;
					width: 50vmin;
					height: 50vmin;
					position: relative;
				}
				
				.butterfly {
					border-radius: 50%;
					position: absolute;
					top: 50%;
					left: 50%;
					animation: wheel 4.5s infinite cubic-bezier(0.35, 0, 0.6, 1);
					border: 2px solid #f5f5f5;
				}
				.butterfly:nth-child(1) {
					background: linear-gradient(to top, #f5f5f5 45%, hsl(21.1764705882deg, 70%, 50%) 65%);
					width: 94.4444444444%;
					height: 94.4444444444%;
					transform: translate(-50%, -50%) rotate(2880deg);
				}
				.butterfly:nth-child(2) {
					background: linear-gradient(to top, #f5f5f5 45%, hsl(42.3529411765deg, 70%, 50%) 65%);
					width: 88.8888888889%;
					height: 88.8888888889%;
					transform: translate(-50%, -50%) rotate(2520deg);
				}
				.butterfly:nth-child(3) {
					background: linear-gradient(to top, #f5f5f5 45%, hsl(63.5294117647deg, 70%, 50%) 65%);
					width: 83.3333333333%;
					height: 83.3333333333%;
					transform: translate(-50%, -50%) rotate(2160deg);
				}
				.butterfly:nth-child(4) {
					background: linear-gradient(to top, #f5f5f5 45%, hsl(84.7058823529deg, 70%, 50%) 65%);
					width: 77.7777777778%;
					height: 77.7777777778%;
					transform: translate(-50%, -50%) rotate(1800deg);
				}
				.butterfly:nth-child(5) {
					background: linear-gradient(to top, #f5f5f5 45%, hsl(105.8823529412deg, 70%, 50%) 65%);
					width: 72.2222222222%;
					height: 72.2222222222%;
					transform: translate(-50%, -50%) rotate(1440deg);
				}
				.butterfly:nth-child(6) {
					background: linear-gradient(to top, #f5f5f5 45%, hsl(127.0588235294deg, 70%, 50%) 65%);
					width: 66.6666666667%;
					height: 66.6666666667%;
					transform: translate(-50%, -50%) rotate(1080deg);
				}
				.butterfly:nth-child(7) {
					background: linear-gradient(to top, #f5f5f5 45%, hsl(148.2352941176deg, 70%, 50%) 65%);
					width: 61.1111111111%;
					height: 61.1111111111%;
					transform: translate(-50%, -50%) rotate(720deg);
				}
				.butterfly:nth-child(8) {
					background: linear-gradient(to top, #f5f5f5 45%, hsl(169.4117647059deg, 70%, 50%) 65%);
					width: 55.5555555556%;
					height: 55.5555555556%;
					transform: translate(-50%, -50%) rotate(360deg);
				}
				.butterfly:nth-child(9) {
					background: linear-gradient(to top, #f5f5f5 45%, hsl(190.5882352941deg, 70%, 50%) 65%);
					width: 50%;
					height: 50%;
					transform: translate(-50%, -50%) rotate(0deg);
				}
				.butterfly:nth-child(10) {
					background: linear-gradient(to top, #f5f5f5 45%, hsl(211.7647058824deg, 70%, 50%) 65%);
					width: 44.4444444444%;
					height: 44.4444444444%;
					transform: translate(-50%, -50%) rotate(-360deg);
				}
				.butterfly:nth-child(11) {
					background: linear-gradient(to top, #f5f5f5 45%, hsl(232.9411764706deg, 70%, 50%) 65%);
					width: 38.8888888889%;
					height: 38.8888888889%;
					transform: translate(-50%, -50%) rotate(-720deg);
				}
				.butterfly:nth-child(12) {
					background: linear-gradient(to top, #f5f5f5 45%, hsl(254.1176470588deg, 70%, 50%) 65%);
					width: 33.3333333333%;
					height: 33.3333333333%;
					transform: translate(-50%, -50%) rotate(-1080deg);
				}
				.butterfly:nth-child(13) {
					background: linear-gradient(to top, #f5f5f5 45%, hsl(275.2941176471deg, 70%, 50%) 65%);
					width: 27.7777777778%;
					height: 27.7777777778%;
					transform: translate(-50%, -50%) rotate(-1440deg);
				}
				.butterfly:nth-child(14) {
					background: linear-gradient(to top, #f5f5f5 45%, hsl(296.4705882353deg, 70%, 50%) 65%);
					width: 22.2222222222%;
					height: 22.2222222222%;
					transform: translate(-50%, -50%) rotate(-1800deg);
				}
				.butterfly:nth-child(15) {
					background: linear-gradient(to top, #f5f5f5 45%, hsl(317.6470588235deg, 70%, 50%) 65%);
					width: 16.6666666667%;
					height: 16.6666666667%;
					transform: translate(-50%, -50%) rotate(-2160deg);
				}
				.butterfly:nth-child(16) {
					background: linear-gradient(to top, #f5f5f5 45%, hsl(338.8235294118deg, 70%, 50%) 65%);
					width: 11.1111111111%;
					height: 11.1111111111%;
					transform: translate(-50%, -50%) rotate(-2520deg);
				}
				.butterfly:nth-child(17) {
					background: linear-gradient(to top, #f5f5f5 45%, hsl(0deg, 70%, 50%) 65%);
					width: 5.5555555556%;
					height: 5.5555555556%;
					transform: translate(-50%, -50%) rotate(-2880deg);
				}
				
				@keyframes wheel {
					to {
						transform: translate(-50%, -50%) rotate(0deg);
					}
				}
			`}</style>
			<div className={`content ${className}`} {...others}>
				<div className="flower">
					<span className='butterfly' />
					<span className='butterfly' />
					<span className='butterfly' />
					<span className='butterfly' />
					<span className='butterfly' />
					<span className='butterfly' />
					<span className='butterfly' />
					<span className='butterfly' />
					<span className='butterfly' />
					<span className='butterfly' />
					<span className='butterfly' />
					<span className='butterfly' />
					<span className='butterfly' />
					<span className='butterfly' />
					<span className='butterfly' />
					<span className='butterfly' />
					<span className='butterfly' />
					<span className='butterfly' />
				</div>
			</div>
		</>
	)
}

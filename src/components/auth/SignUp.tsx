import { useSignUp } from '@clerk/nextjs';
import { useState } from 'react';

function SignUp() {
	const [emailAddress, setEmailAddress] = useState('');
	const [firstName, setFirstName] = useState('');
	const [password, setPassword] = useState('');
	const [code, setCode] = useState();
	const [pendingVerification, setPendingVerification] = useState(false);

	const { isLoaded, signUp, setActive } = useSignUp();

	if (!isLoaded) {
		// handle loading state
		return null;
	}

	async function signUpSubmit(e) {
		e.preventDefault();
		// Check the sign up response to
		// decide what to do next.
		await signUp.create({
			emailAddress,
			password,
		});
		await signUp?.prepareEmailAddressVerification({ strategy: 'email_code' });
		setPendingVerification(true);
		// .then((result) => {
		// 	if (result.status === 'complete') {
		// 		console.log(result);
		// 		setActive({ session: result.createdSessionId });
		// 	} else {
		// 		console.log(result);
		// 	}
		// })
		// .catch((err) => console.error('error', err.errors[0].longMessage));
	}

	const onVerifySubmit = async () => {
		if (!isLoaded) {
			return;
		}

		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification({
				code,
			});

			await setActive({ session: completeSignUp.createdSessionId });
		} catch (err: any) {
			console.error(JSON.stringify(err, null, 2));
		}
	};

	console.log(password);
	return (
		<div>
			{pendingVerification && (
				<form onSubmit={onVerifySubmit}>
					<div>
						<label htmlFor='code'>Code</label>
						<input type='text' value={code} onChange={(e) => setCode(e.target.value)} />
					</div>
					<button>Verify</button>
				</form>
			)}

			<form onSubmit={signUpSubmit}>
				<div>
					<label htmlFor='email'>Email</label>
					<input type='email' value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
				</div>
				<div>
					<label htmlFor='password'>Password</label>
					<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>
				<div>
					<button type='submit'>Submit</button>
				</div>
			</form>
		</div>
	);
}

export default SignUp;

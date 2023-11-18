'use client';
import { SignedIn, SignedOut, useSignIn, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function SignIn() {
	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const { isLoaded, signIn, setActive } = useSignIn();
	const { signOut } = useClerk();

	async function submit(e: any) {
		e.preventDefault();
		await signIn
			.create({
				identifier: emailAddress,
				password,
			})
			.then((result) => {
				if (result.status === 'complete') {
					console.log(result);
					setActive({ session: result.createdSessionId });
				} else {
					console.log(result);
				}
			})
			.catch((err) => console.error('error', err.errors[0].longMessage));
	}
	return (
		<div>
			<form onSubmit={submit}>
				<div>
					<label htmlFor='email'>Email</label>
					<input type='email' value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
				</div>
				<div>
					<label htmlFor='password'>Password</label>
					<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
				</div>
				<div>
					<button>Sign in</button>
				</div>
			</form>
		</div>
	);
}

export default SignIn;

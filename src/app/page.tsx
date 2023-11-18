'use client';
import { SignedIn, SignedOut, useSignIn, useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AuthScreen from '@/components/auth/AuthScreen';
export default function Home() {
	// const { isLoaded, signUp, setActive } = useSignUp();
	const [emailAddress, setEmailAddress] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const { isLoaded, signIn, setActive } = useSignIn();
	const { signOut } = useClerk();

	if (!isLoaded) {
		return null;
	}

	console.log(emailAddress);
	return (
		<div>
			<SignedIn>
				<p> I am signed in</p>
				<button onClick={() => signOut(() => router.push('/'))}>Signout</button>
			</SignedIn>
			<SignedOut>
				<AuthScreen />
			</SignedOut>
		</div>
	);
}

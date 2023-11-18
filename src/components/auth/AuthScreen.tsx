'use client';
import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

function AuthScreen() {
	const [signup, setSignup] = useState(false);

	return (
		<div>
			{signup ? <SignUp /> : <SignIn />}
			<button onClick={() => setSignup(!signup)}>SignUp</button>
		</div>
	);
}

export default AuthScreen;

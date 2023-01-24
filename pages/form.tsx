import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
	username: string;
	password: string;
	email: string;
}

export default function Forms() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setError,
		setValue,
		reset,
		resetField,
	} = useForm<LoginForm>({
		mode: "onChange",
	});
	const onValid = (data: LoginForm) => {
		console.log("I'm valid baby");
		// setError("username", { message: "Taken username" });
		resetField("email");
	};
	const onInvalid = (errors: FieldErrors) => {
		console.log(errors);
	};
	console.log(errors);
	return (
		<form onSubmit={handleSubmit(onValid, onInvalid)}>
			<input
				{...register("username", {
					required: "Username is required",
					minLength: {
						message: "The username should be longer than 5 chars.",
						value: 5,
					},
				})}
				type="text"
				placeholder="Username"
				minLength={5}
			/>
			<input
				{...register("email", {
					required: "Email is required",
					validate: {
						notGmail: (value) =>
							!value.includes("@gmail.com") || "Gmail is not allowed",
					},
				})}
				type="email"
				placeholder="Email"
				className={`${
					Boolean(errors.email?.message) ? "border-red-500 border-2" : ""
				}`}
			/>
			<span className={`${Boolean(errors.email)}` ? "text-red-500" : ""}>
				{errors.email?.message}
			</span>
			<input
				{...register("password", { required: "Password is required" })}
				type="password"
				placeholder="password"
			/>
			<input type="submit" value="Create Account" />
			{errors.username?.message}
		</form>
	);
}

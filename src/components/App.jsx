import { useReducer } from "react";
import "../assets/App.css";
import Header from "./Header";
import MainSection from "./MainSection";

const initialState = {
	isActive: false,
	loan: 0,
	balance: 0,
	depositInput: 0,
	withdrawInput: 0,
};

const reducer = (state, action) => {
	switch (action.type) {
		case "openAcc":
			return { ...state, isActive: true, balance: 500 };

		case "setDeposit":
			return { ...state, depositInput: Number(action.payload) };

		case "deposit":
			return { ...state, balance: state.balance + state.depositInput };
		case "setWithdraw":
			return { ...state, withdrawInput: Number(action.payload) };
		case "withdraw":
			return { ...state, balance: state.balance - state.withdrawInput };
		case "takeLoan":
			return { ...state, balance: state.loan === 0 ? state.balance + 5000 : state.balance, loan: state.loan === 0 ? state.loan + 5000 : state.loan };
		case "payLoan":
			return { ...state, balance: state.balance - state.loan, loan: 0 };
		case "closeAcc":
			return { ...state, isActive: state.balance === 0 && state.loan === 0 ? false : state.isActive };
		default:
			throw new Error("Unexpected action happened");
	}
};

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { isActive, loan, balance, depositInput, withdrawInput } = state;

	return (
		<>
			<div className="App">
				<Header />
				<MainSection>
					<p>
						Balance:<strong className={balance < 0 ? "nagativeVal" : ""}>{balance}</strong>
					</p>
					<p>
						Loan:<strong>{loan}</strong>
					</p>

					{!isActive ? (
						<button
							onClick={() => {
								dispatch({ type: "openAcc" });
							}}
						>
							Open account
						</button>
					) : (
						<>
							<div>
								<input value={depositInput} onChange={(event) => dispatch({ type: "setDeposit", payload: event.target.value })}></input>
								<button
									onClick={() => {
										dispatch({ type: "deposit" });
									}}
									disabled={depositInput <= 0}
								>
									Deposit
								</button>
							</div>
							<div>
								<input value={withdrawInput} onChange={(event) => dispatch({ type: "setWithdraw", payload: event.target.value })}></input>
								<button
									onClick={() => {
										dispatch({ type: "withdraw" });
									}}
									disabled={withdrawInput <= 0}
								>
									Withdraw
								</button>
							</div>

							<button
								onClick={() => {
									dispatch({ type: "takeLoan" });
								}}
								disabled={loan !== 0}
							>
								Request a loan of 5000
							</button>
							<button
								onClick={() => {
									dispatch({ type: "payLoan" });
								}}
							>
								Pay loan
							</button>
						</>
					)}

					<button
						onClick={() => {
							dispatch({ type: "closeAcc" });
						}}
						disabled={balance !== 0 || loan !== 0 || isActive === false}
					>
						Close Account
					</button>
				</MainSection>
			</div>
		</>
	);
}

export default App;

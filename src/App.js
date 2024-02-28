import { useState } from "react";
import Input from "./components/Input";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {

  const[amount,setamount] = useState(0)
  const[from,setFrom] = useState("usd")
  const[to,setTo] = useState("inr")
  const[convertedAmount,setConvertedAmount] = useState(0)
  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)
  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setamount(convertedAmount)
  }
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }
  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat" style={{backgroundImage:  `url('https://images.pexels.com/photos/5126268/pexels-photo-5126268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`}}>
        <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-lg bg-white/30">
            <form onSubmit={(e) => {e.preventDefault()
            convert()}}>
              <div className="w-full mb-2">
                  <Input label="From"
                  amount={amount}
                  currencyOptions={options}
                  onCurrencyChange={(currency) => setFrom(currency)} //1st change
                  selectCurrency={from}
                  onAmountChange={(amount) => setamount(amount)}
                  />
              </div>
              <div className="relative w-full h-0.5">
                <button type="button" className="absolute right-[170px] 
                -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white
                px-4 py-1" 
                onClick={swap}>
                    <span className="font-bold text-[18px]">swap</span>
                </button>
              </div>
              <div className=" mt-2">
                <Input
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
                />
              </div>
              <button type="submit"
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg mt-6"
                >
                  <span className="font-bold text-[18px]">Convert {from.toUpperCase()} to {to.toUpperCase()}</span>
              </button>
            </form>
          </div>
        </div>
    </div>
  );
}

export default App;

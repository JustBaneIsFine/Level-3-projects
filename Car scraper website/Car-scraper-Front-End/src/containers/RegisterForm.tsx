import ButtonClassic from '../components/ButtonClassic';
import ButtonClassicLink from '../components/ButtonClassicLink';

export default function RegisterForm() {
  return (
    <div className=" m-auto mt-5 flex w-4/5  justify-center text-xs sm:mt-8 sm:w-2/3 sm:text-sm">
      <div className="h-80 w-full rounded-xl bg-white sm:h-96 sm:w-1/2 ">
        <div className="m-3 text-center text-xl sm:m-3 sm:text-3xl">
          Register
        </div>
        <div className="m-auto -mt-5 flex  h-2/4  w-11/12 flex-col justify-center space-y-1 sm:-mt-5  sm:space-y-2">
          <div className="flex">
            <input
              className="m-auto w-4/5 rounded-sm border border-black p-1"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="flex">
            <input
              className="m-auto w-4/5 rounded-sm border border-black p-1"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="flex">
            <input
              className="m-auto w-4/5 rounded-sm border border-black p-1"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="flex">
            <input
              className="m-auto w-4/5 rounded-sm border border-black p-1"
              type="password"
              placeholder="Confirm password"
            />
          </div>
        </div>

        <div className="m-auto mt-3 flex w-2/4 flex-col justify-center sm:mt-2">
          <ButtonClassic name="Create Account" onclick={x} />
          <ButtonClassicLink name="Log in" link="/Login" />
        </div>
      </div>
    </div>
  );
  function x() {
    // x
  }
}

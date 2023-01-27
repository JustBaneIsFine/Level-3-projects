import userPlaceholder from '../assets/icons/user placeholder.png';

export default function AccountOverview() {
  return (
    <div className="h-full w-full">
      <div className="flex w-full justify-center border-b  bg-slate-400 text-center">
        Account Overview
      </div>
      <div className="mt-12 ml-10 flex justify-evenly">
        <div className="text-center">
          <div>
            <img src={userPlaceholder} alt="" className="h-28" />
          </div>
          <div className="mt-2">John Doe</div>
        </div>
        <div className="">
          <div>
            <span className=" mr-4 font-light">Number of posts:</span> 1
          </div>
          <div>
            <span className=" mr-4 font-light">Join date:</span> 2/2/2023
          </div>
          <div>
            <span className=" mr-4 font-light">Other data: </span> data
          </div>
        </div>
      </div>
    </div>
  );
}

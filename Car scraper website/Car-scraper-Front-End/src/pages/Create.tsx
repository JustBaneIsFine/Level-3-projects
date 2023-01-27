import { useEffect, useRef, useState } from 'react';
import carPlaceholder from '../assets/icons/car-placeholder.png';
import { StepsInterface } from '../interfaces/StateInterfaces';
import ButtonClassic from '../components/ButtonClassic';

export default function Create({ x }: { x: string }) {
  const [steps, setSteps] = useState<StepsInterface>({} as StepsInterface);
  const addPicRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setSteps({
      step1: true,
      step2: false,
      step3: false,
      step4: false,
    });
  }, []);

  return (
    <div className="text-center">
      <div>
        <div>Create your post here:</div>

        <img
          src={carPlaceholder}
          alt=""
          className="m-auto rounded-3xl  shadow-xl  "
        />
        <ButtonClassic
          st="dark:text-white"
          name="Add picture"
          onclick={() => {
            addPicRef.current?.click();
          }}
        />
        <input ref={addPicRef} type="file" name="" id="" className="hidden" />
      </div>
      <div>
        <div
          className={`${
            steps.step1 ? '' : 'pointer-events-none opacity-10'
          }  mx-3  mt-3 flex  flex-col justify-around gap-2 rounded-t-lg border border-black bg-slate-100 p-5 duration-500 dark:border-white dark:bg-slate-700 sm:flex-row`}
        >
          <div>step1</div>
          <input
            type="text"
            className="dark:text-black"
            placeholder="Car Make"
            name=""
            id=""
          />
          <input
            type="text"
            className="dark:text-black"
            placeholder="Car Model"
            name=""
            id=""
          />
          <input
            type="text"
            className="dark:text-black"
            placeholder="Car Year"
            name=""
            id=""
          />

          <ButtonClassic
            st="sm:-m-1 dark:text-white"
            name="confirm"
            onclick={() => {
              finishStep('1');
            }}
          />
        </div>
        <div
          className={`${
            steps.step2 ? '' : 'pointer-events-none opacity-10'
          } mx-3 flex flex-col  justify-around gap-2 border   border-black bg-slate-100 p-5 duration-500 dark:border-white dark:bg-slate-700 sm:flex-row`}
        >
          <div>step2</div>
          <input
            type="text"
            placeholder="Car Fuel"
            name=""
            id=""
            className=" dark:text-black"
          />
          <input
            type="text"
            className="dark:text-black"
            placeholder="Car KM"
            name=""
            id=""
          />
          <input
            type="text"
            className="dark:text-black"
            placeholder="Car CC"
            name=""
            id=""
          />

          <ButtonClassic
            st="sm:-m-1 dark:text-white "
            name="confirm"
            onclick={() => {
              finishStep('2');
            }}
          />
        </div>
        <div
          className={`${
            steps.step3 ? '' : 'pointer-events-none opacity-10'
          } mx-3  flex flex-col justify-around gap-2 border  border-black bg-slate-100 p-5 duration-500 dark:border-white dark:bg-slate-700 sm:flex-row`}
        >
          <div>step3</div>
          <input
            type="text"
            className="dark:text-black"
            placeholder="Car Price"
            name=""
            id=""
          />

          <select
            className="bg-slate-200 p-1 dark:bg-slate-600"
            required
            defaultValue=""
          >
            <option value="">Please select your currency</option>
            <option value="eur">eur</option>
            <option value="rsd">rsd</option>
          </select>
          <ButtonClassic
            st="sm:-m-1 dark:text-white"
            name="confirm"
            onclick={() => {
              finishStep('3');
            }}
          />
        </div>
        <div
          className={`${
            steps.step4 ? '' : 'pointer-events-none opacity-10'
          } mx-3 flex flex-col justify-around gap-2 rounded-b-lg border  border-black bg-slate-100 p-5 duration-500 dark:border-white dark:bg-slate-700 sm:flex-row`}
        >
          <div>step4</div>
          <ButtonClassic
            st="sm:-m-1 dark:text-white"
            name="confirm"
            onclick={() => {
              finishStep('4');
            }}
          />
        </div>
      </div>
    </div>
  );

  function finishStep(stepNum: string) {
    switch (stepNum) {
      case '1':
        setSteps((prev) => ({
          ...prev,
          step1: false,
          step2: true,
        }));
        break;
      case '2':
        setSteps((prev) => ({
          ...prev,
          step2: false,
          step3: true,
        }));
        break;
      case '3':
        setSteps((prev) => ({
          ...prev,
          step3: false,
          step4: true,
        }));
        break;
      default:
        setSteps((prev) => ({
          ...prev,
          step4: false,
        }));
        break;
    }
  }
}

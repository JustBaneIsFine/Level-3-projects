export default function About({ x }: { x: string }) {
  return (
    <div className=" m-auto mt-5 flex w-3/4 flex-col text-center text-slate-100 sm:mt-8">
      <div className="text-2xl sm:text-4xl">About the website</div>
      <p className="mt-2 text-sm">
        Important: This website is only used for demonstration purposes for my
        portfolio. If you are the owner of the below websites and do not want
        the websites to be scraped please contact me!
      </p>
      <div className="mt-10 flex-col sm:grid sm:grid-cols-3">
        <div>
          <div className="text-xl  sm:text-2xl">Websites used:</div>

          <div className="m-auto mt-5 w-1/2 border border-dashed border-white  opacity-50" />
          <ol className="mt-3 ">
            <li>
              <a
                href="https://www.kupujemprodajem.com"
                className="text-blue-400 hover:border-b-2 hover:border-blue-400"
              >
                KupujemProdajem.com
              </a>
            </li>
            <li>
              <a
                className="text-blue-400 hover:border-b-2 hover:border-blue-400"
                href="https://www.polovniautomobili.com"
              >
                PolovniAutomobili.com
              </a>
            </li>
            <li className="mt-3 text-sm text-amber-500">
              I Plan to add one more
            </li>
          </ol>
        </div>
        <div>
          <div className="mt-6 text-xl sm:mt-0 sm:text-2xl">
            Website built with:
          </div>
          <div className="m-auto mt-5 w-1/2 border border-dashed border-white  opacity-50" />
          <p className="mt-3">Front-End: </p>
          <p>Vite, Typescript, Tailwind, React</p>
          <p>Eslint, prettier </p>
          <p className="mt-3">Back End:</p>
          <p>Express, Mongo, Node</p>
        </div>

        <div>
          <div className=" mt-6 text-xl sm:mt-0 sm:text-2xl"> Contact </div>
          <div className="m-auto mt-5 w-1/2 border border-dashed border-white  opacity-50" />
          <ol className="mt-3">
            <li>
              <a href="/">Facebook</a>
            </li>
            <li>
              <a href="/">Linkedin</a>
            </li>
            <li>
              <a href="/">Github</a>
            </li>
            <li>
              <a href="/">Gmail</a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

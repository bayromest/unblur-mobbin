const App = () => {
  return (
    <div className="p-12 flex flex-col items-center bg-black text-white text-center w-96">
      <img src="/icons/icon128.png" className="" />
      <h1 className="text-xl font-bold">Inspiration should be free</h1>
      <div className="text-xs text-gray-400 flex space-x-1 items-center">
        <p>Developped by</p>
        <img src="/images/bayrem.jpg" className="h-4 rounded-full" />
        <p>Bayrem</p>
      </div>
      <a
        href="https://github.com/bayromest/unblur-mobbin"
        target="_blank"
        className="p-4"
      >
        <img src="/images/github-white.svg" className="h-10" />
      </a>
    </div>
  );
};

export default App;

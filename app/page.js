import FacebookTest from "./auth/GetInsights";
import Profile from "./auth/Profile";

export default function Home() {
  return (
    <section class="py-8 z-10 font-serif">
      <FacebookTest/>
      <div class="flex flex-col md:flex-row items-center max-w-6xl px-6 py-8 mx-auto"></div>
      <div class="w-full md:w-1/2 py-8">
        <h1 class="text-purple-900 text-7xl font-semibold leading-none tracking-tighter">
          Welcome to <br />
          <span class="text-blue-500">
            My Portfolio, <br />
          </span>{" "}
          I am Web Developer.
        </h1>
        <Profile />
      </div>
      <div class="w-full md:w-1/2 py-8">
        <img
          src="https://www.svgrepo.com/show/493509/person-who-invests.svg"
          class="g-image"
        />
      </div>
    </section>
  );
}

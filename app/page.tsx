import Image from "next/image";
import loginimg from "../public/Images/loginimg.jpg";
import { LoginCard } from "@/components/LoginCard";
import webicon from "../public/Images/icon.png";

interface QuoteObj {
  quote: string;
  director: string;
}

const quotesData: { [key: string]: { quote: string; director: string } } = {
  "1": {
      "quote": "You keep on learning. It doesn’t stop. I think the minute I stop feeling that I’m going to, you know — stop learning — I would stop being a filmmaker.",
      "director": "Deepa Mehta"
  },
  "2": {
      "quote": "I’m not a master; I’m just a hard-working filmmaker. I would like everyone to see me as a friend rather than a master.",
      "director": "John Woo"
  },
  "3": {
      "quote": "Create your own visual style. Let it be unique for yourself and yet identifiable for others.",
      "director": "Orson Welles"
  },
  "4": {
      "quote": "When you love something it’s not a job anymore.",
      "director": "Spike Lee"
  },
  "5": {
      "quote": "Without risks you don’t go anywhere, you don’t learn anything, and the movies that have been least enjoyable for me have been the ones that have kind of been by rote. Directors should always explore their boundaries — that’s where really exciting things happen.",
      "director": "Ellen Kuras"
  },
  "6": {
      "quote": "It’s cool for me because I’m a director, but I’m also a teacher. I’m a lover of cinema, and I love working with people who are hungry and have the energy to really do better work.",
      "director": "John Singleton"
  },
  "7": {
      "quote": "A good director creates an environment, which gives the actor the encouragement to fly.",
      "director": "Kevin Bacon"
  },
  "8": {
      "quote": "I love more than anything looking at a movie scene by scene and seeing the intention behind it. It allows you to really appreciate the hand of the filmmaker.",
      "director": "Jodie Foster"
  },
  "9": {
      "quote": "A director makes 100 decisions an hour. Students ask me how you know how to make the right decision, and I say to them, ‘If you don’t know how to make the right decision, you’re not a director.'",
      "director": "George Lucas"
  },
  "10": {
      "quote": "Be passionate and move forward with gusto every single hour of every single day until you reach your goal.",
      "director": "Ava DuVernay"
  },
  "11": {
      "quote": "Never give up. If you want to become one, you have to be really, really strong, never give up, because you’re going to have so many ‘nos.’ When I wrote my first screenplay I was 17, but when I directed my first film I was 36. It gives you an idea how long it takes.",
      "director": "Julie Delpy"
  },
  "12": {
      "quote": "Pick up a camera. Shoot something. No matter how small, no matter how cheesy, no matter whether your friends and your sister star in it. Put your name on it as director. Now you’re a director. Everything after that you’re just negotiating your budget and your fee.",
      "director": "James Cameron"
  },
  "13": {
      "quote": "To be an artist means never to avert one’s eyes.",
      "director": "Akira Kurosawa"
  },
  "14": {
      "quote": "If it can be written or thought, it can be filmed.",
      "director": "Stanley Kubrick"
  },
  "15": {
      "quote": "Don’t give me any money, don’t give me any people, but give freedom, and I’ll give you a movie that looks gigantic.",
      "director": "Robert Rodriguez"
  },
  "16": {
      "quote": "I try to push ideas away, and the ones that will not leave me alone are the ones that ultimately end up happening.",
      "director": "J.J. Abrams"
  },
  "17": {
      "quote": "For me, shooting, editing, and scoring rely on rhythm.",
      "director": "Donnie Yen"
  },
  "18": {
      "quote": "As a filmmaker, I always try not to concern myself with the outcome of things. I make the movie, and I do that as honestly and good as I can. I don’t want to pollute my thoughts with what is going to happen with it afterwards, because I have to work inside-out.",
      "director": "Susanne Bieris"
  },
  "19": {
      "quote": "One of the things you do as a writer and as a filmmaker is grasp for resonant symbols and imagery without necessarily fully understanding it yourself.",
      "director": "Christopher Nolan"
  },
  "20": {
      "quote": "I always want to make films. I think of it as a great opportunity to comment on the world in which we live.",
      "director": "Kathryn Bigelow"
  },
  "21": {
      "quote": "Humans have both the urge to create and destroy.",
      "director": "Hayao Miyazaki"
  },
  "22": {
      "quote": "There is no terror in the bang, only in the anticipation of it.",
      "director": "Alfred Hitchcock"
  },
  "23": {
      "quote": "This whole world is wild at heart and weird on top.",
      "director": "David Lynch"
  },
  "24": {
      "quote": "The journey of filmmaking is so amazing. You start off with great confidence, and develop insecurity at the time of release. When you are ready with the finished product, you are constantly wondering if you have been honest to the story you started out with, if you got what you wanted. One is too close to the project by then to be objective.",
      "director": "Mani Ratnam"
  },
  "25": {
      "quote": "Cinema is an art form that is designed to go across borders. And as a filmmaker, the only way I can direct a movie is when I feel close to my culture.",
      "director": "Denis Villeneuve"
  },
  "26": {
      "quote": "My favourite virtue is not having any.",
      "director": "Ram Gopal Varma"
  },
  "27": {
      "quote": "Cinema is a mirror by which we often see ourselves.",
      "director": "Alejandro Gonzalez Inarritu"
  },
  "28": {
      "quote": "I don't find anything black and white; I find grey in every person, and that is what excites me.",
      "director": "Vetrimaaran"
  }
}

const getQuote = (): QuoteObj => {
  const randomIndex = Math.floor(Math.random() * 28) + 1;
  const selectedQuote = quotesData[randomIndex.toString()];
  const { quote, director } = selectedQuote;
  return { quote, director };
};

export default function Login() {
  const { quote, director } = getQuote();
  return (
    <div className="w-screen h-screen grid grid-rows-1 md:grid-cols-5 ">
      <div className="w-full h-full bg-white md:h-screen md:w-full md:col-span-3">
        <Image
        unoptimized
          src={loginimg}
          alt="cinema"
          className="h-screen md:h-full"
        ></Image>
        <div className="bg-black opacity-50 w-full md:w-3/5 h-full centered justify-center absolute top-0 left-0 z-5 md:z-10"></div>
        <h1 className="hidden w-screen md:flex md:font-bold md:w-3/5  md:text-3xl absolute md:top-1/3 md:p-10 md:justify-center md:centered md:z-40 md:text-white">
          "{quote}"
        </h1>
        <h1 className="hidden w-screen md:flex md:font-bold md:w-1/4  md:text-3xl absolute md:top-3/4 md:left-1/4 md:p-10 md:centered md:z-40 md:text-white md:justify-center">
          - {director}
        </h1>
      </div>
      <Image
        src={webicon}
        alt="logo"
        className="h-1/4 w-1/2 top-20 right-20 md:h-1/6 md:w-1/6
      absolute md:top-2 md:right-0 md:mr-8 md:mt-4"
      ></Image>
      <div className="w-full h-full md:h-screen md:w-full md:col-span-2 flex flex-col items-center text-white z-50 top-10 absolute md:top-0 md:relative justify-center">
        <LoginCard />
      </div>
    </div>
  );
}


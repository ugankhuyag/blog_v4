import "@/components/dayjs-mn"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);

const pageSize = 6;

export default function Home() {
  const [articles, setArticles] = useState ([]);
  const [page, setPage] = useState (1);
  const [ended, setEnded] = useState (false);
  const [loading, setLoading] = useState (false);


    useEffect(() => {
      loadMore();
    }, []);

    function loadMore (){
      setLoading(true);
      
      fetch(`https://dev.to/api/articles?username=paul_freeman&page=${page}&per_page=${pageSize}`)
      .then((response) => {
        return response.json();
      })
      .then((newArticles) => {
        const updatedArticles = articles.concat(newArticles);
        setArticles(updatedArticles);
        setPage(page + 1);
      if (newArticles.length < pageSize) {
        setEnded(true);
      }
      setLoading(false);
    });
  }

  return (
  <div className="container mx-auto">
    
    <div className="navbar bg-base-100 mb-4">

        <div className="navbar-start">
          <a className="btn btn-ghost text-xl" >Meta<b>Blog</b></a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a>Home</a></li>
            <li><a>Blog</a></li>
            <li><a>Contact</a></li>
          </ul>
        </div>
        
        <div className="navbar-end">
          <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
            </svg>
          </label>
        </div>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"> 
      {articles.map((item) => (
        <div key={item.id} className="shadow-lg card bg-base-100">
          <div className="card-body">
          <Image src={item.social_image} width={500} height={500} className="aspect-video object-cover bg-slate-600"/>
          <div className="badge badge-primary badge-outline">{item.tag_list[0]}</div>
          <Link href={item.url} target="_blank">{item.title}
          </Link>
          <div className="flex gap-4">
          <Image src={item.user.profile_image_90} width={50} height={50} />
          <div className="">{item.user.name}</div> 
          <div className="">{dayjs(item.published_at).locale('mn').fromNow("YYYY.MM.DD")}</div>
          </div>
        </div>  
        </div>
      ))}
    </div>
    {!ended && (
      <div className="py-10 text-center" onClick={loadMore}>
        <button disabled={loading} className="btn btn-accent text-center">
        {loading && <span className="loading loading-spinner"></span>}
        Load more
        </button>                                                             
      </div>                                                      
    )}
  <footer className="footer bg-base-300 text-base-content p-10 top-4">
  <div className="grid-cols-3">
  <nav>
    <h6 className="footer-title">About</h6>
    <a className="link link-hover">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</a><br /><br />
    <a className="link link-hover"><b>Email</b> : info@jstemplate.net</a><br />
    <a className="link link-hover"><b>Phone</b> : 880 123 456 789</a><br />
  </nav>
  <nav className="mx-auto ">
    <a className="link link-hover">Home</a><br />
    <a className="link link-hover">Blog</a><br />
    <a className="link link-hover">Contact</a><br />
  </nav>
  <nav>
    <div className="grid grid-flow-col justify-items-center">
      <a>
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
        </svg>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
        </svg>
      </a>
      <a>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          className="fill-current">
          <path
            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>                                                                                                                                                                                                                                                       
        </svg>
      </a>
    </div>
  </nav>
  </div>                            
  <div></div>
</footer>
<div>
<footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4 block"> 
<div className="grid-cols-2 justify-end">
<nav className="justify-end">
    <a className="link link-hover">Logo</a>
</nav>

<nav className="">
    <a className="link link-hover">Terms of Use |</a>
    <a className="link link-hover">Privacy Policy |</a>
    <a className="link link-hover">Cookie Policy</a>
</nav>
</div>
</footer>                                
</div>


  </div>
  );
}

"use client";
import React, { useEffect } from "react";
import "../styles/globals.css";
import { useSnackBar } from "@components/SnackBar/SnackBarService";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Carousel from "@components/Carousel";

const Page = () => {
  const router = useRouter()
  const snackBar = useSnackBar();
  const { data: session } = useSession();
  const snackBarSucessdata = {
    message: "Login Successfull",
    label: "Logged In",
    link: {
      href: "/profile",
      label: "view profile",
    },
  };

  useEffect(() => {
    const hasRunOnce = sessionStorage.getItem("hasRunOnce");
    if (!hasRunOnce && session?.user) {
      sessionStorage.setItem("hasRunOnce", "true");
      snackBar.open(
        "success",
        {
          ...snackBarSucessdata,
          message: (
            <div className="flex gap-1 w-full">
              Login Successfull{" "}
              <div className="max-w-16 lg:max-w-24 truncate ... font-bold">{`${session?.user.name}`}</div>
            </div>
          ),
        },
        7000
      );
    }
  }, [session]);
  const handleLocation = () => {
    return <>

    </>
  }
  const sliderImages = [
    {
      src: 'https://images.pexels.com/photos/162539/architecture-building-amsterdam-blue-sky-162539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'display-image'
    },
    {
      src: 'https://images.pexels.com/photos/941195/pexels-photo-941195.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'display-image'
    },
    {
      src: 'https://images.pexels.com/photos/347141/pexels-photo-347141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'display-image'
    },
    {
      src: 'https://images.pexels.com/photos/273204/pexels-photo-273204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'display-image'
    },
    {
      src: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'display-image'
    },
    {
      src: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'display-image'
    },
    {
      src: 'https://images.pexels.com/photos/259580/pexels-photo-259580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      alt: 'display-image'
    },
  ]
  return <>
    <div className="">
      <ul className="flex gap-4 overflow-scroll hidden-scrollbar my-4 px-2">
        <li className="flex gap-1 items-center bg-active-orange px-2 py-1 w-max text-nowrap text-white uppercase tracking-wider rounded-md cursor-pointer flex-nowrap"
          onClick={() => router.push('/search?page=1&query={"listing_type":["For%20Sale"]}')}
        ><i class="fa-solid fa-house-circle-check text-white"></i>Buy</li>
        <li className="flex gap-1 items-center bg-active-orange px-2 py-1 w-max text-nowrap text-white uppercase tracking-wider rounded-md cursor-pointer flex-nowrap"
          onClick={() => router.push('/search?page=1&query={"listing_type":["For%20Rent"]}')}
        ><i class="fa-solid fa-truck-moving text-white"></i>Rent</li>
        <li className="flex gap-1 items-center bg-active-orange px-2 py-1 w-max text-nowrap text-white uppercase tracking-wider rounded-md cursor-pointer flex-nowrap"
          onClick={() => router.push('/search?page=1&query={"property_type":["Independent","Residential%20Land"]}')}
        ><i class="fa-solid fa-table-cells text-white"></i>Plot/Land</li>
        <li className="flex gap-1 items-center bg-active-orange px-2 py-1 w-max text-nowrap text-white uppercase tracking-wider rounded-md cursor-pointer flex-nowrap"
          onClick={() => router.push('/profile/add-listing')}
        ><i class="fa-solid fa-house-user text-white"></i><span>Add a listing</span></li>
      </ul>
    </div>
    <div className="w-full h-80 m-2 rounded-md lg:h-96">
      <Carousel slides={sliderImages} autoSlide={true} />
    </div>
    <div className="home">
      <div className="text">
        <div className="bg-opacity-50 bg-black px-4 py-4 mt-4 rounded-md font-inter">
          <h1>Buying <span className="head-and">&</span> Selling</h1>
          <p className="text-para">Unlock Your Dream Home: Where Flats Find Their Perfect Match!</p>
          <button className="bg-white px-4 py-4 rounded-md text-active-orange uppercase text-xl mt-2  shadow-md" > More About</button>
        </div>
        <ul>
          <li><i className="fa-brands fa-facebook-f"></i></li>
          <li><i className="fa-brands fa-linkedin-in"></i></li>
          <li><i className="fa-brands fa-whatsapp"></i></li>
          <li><i className="fa-brands fa-instagram"></i></li>
        </ul>
      </div>
    </div>
    <div className="home-middle">
      <div><span className="input-sec"><input className="local-input" type="text" placeholder="Search by locality or landmark" /><i class="fa-solid fa-location-crosshairs" onClick={handleLocation}></i><i class="fa-solid fa-magnifying-glass" ></i></span></div>
      <div className="highlights">
        <h2>Apartments, Villas and more</h2>
        <div className="card-section">
          <div className="high-card">
            <div className="high-image">
              <img src="https://res.cloudinary.com/sentral/image/upload/w_1000,h_1000,q_auto:eco,c_fill/f_auto/v1684782440/miro_hero_building_exterior_2000x1125.jpg" alt="" />

            </div>
            <div className="high-card-desp">
              <h3>Residential Apartments</h3>
              <p>10,000+ Properties</p>
            </div>
          </div>
          <div className="high-card">
            <div className="high-image">
              <img src="https://tjh.com/wp-content/uploads/2023/04/denver-new-home-Meade2.webp" alt="" />

            </div>
            <div className="high-card-desp">
              <h3>Independent House/ Villa</h3>
              <p>900+ Properties</p>
            </div>
          </div>
          <div className="high-card">
            <div className="high-image">
              <img src="https://5.imimg.com/data5/FD/BL/MY-11964470/residential-plots-500x500.jpg" alt="" />

            </div>
            <div className="high-card-desp">
              <h3>Residential Land</h3>
              <p>60+ Properties</p>
            </div>
          </div>
          <div className="high-card">
            <div className="high-image">
              <img src="https://www.redfin.com/blog/wp-content/uploads/2022/11/farmhouse-1.jpg" alt="" />

            </div>
            <div className="high-card-desp">
              <h3>Farm House</h3>
              <p>12+ Properties</p>
            </div>
          </div>


        </div>
      </div>
    </div>
    <div className="home-lower-middle">
      <h2><i class="fa-solid fa-map-location"></i> New Launch Property in  Mumbai for Sale/Rent</h2>
      <div className="card-section-homes">


        <div className="home-card">
          <div className="room-img-sec">
            <div className="room-tag"><span ><i class="fa-solid fa-check"></i>Verified</span><span><i class="fa-regular fa-heart"></i></span></div>
            <img className="home-img" src="https://newprojects.99acres.com/projects/shree_ashapura_realtors/shree_samarth_aura/images/hvmq23u_1709224810_476725078_med.jpg" alt="" />
          </div>
          <div className="rooms-desp">
            <h3> <span>Raunak Niwas</span></h3>
            <p>01, Ganesh Yadav Chawl, Farid Nagar, Bhandup(w) 400078</p>
            <div className="price-inline">
              <div className="rooms-border">Rs 14000<h6>Rent</h6></div>
              <div className="rooms-border">550 sq.ft</div>
            </div>
            <div className="room-highness"><span> Near to station</span></div>
          </div>
        </div>
        <div className="home-card">
          <div className="room-img-sec">
            <div className="room-tag"><span ><i class="fa-solid fa-check"></i>Verified</span><span><i class="fa-regular fa-heart"></i></span></div>
            <img className="home-img" src="https://newprojects.99acres.com/projects/shree_ashapura_realtors/shree_samarth_aura/images/hvmq23u_1709224810_476725078_med.jpg" alt="" />
          </div>
          <div className="rooms-desp">
            <h3> <span>Raunak Niwas</span></h3>
            <p>01, Ganesh Yadav Chawl, Farid Nagar, Bhandup(w) 400078</p>
            <div className="price-inline">
              <div className="rooms-border">Rs 14000<h6>Rent</h6></div>
              <div className="rooms-border">550 sq.ft</div>
            </div>
            <div className="room-highness"><span> Near to station</span></div>
          </div>
        </div>
        <div className="home-card">
          <div className="room-img-sec">
            <div className="room-tag"><span ><i class="fa-solid fa-check"></i>Verified</span><span><i class="fa-regular fa-heart"></i></span></div>
            <img className="home-img" src="https://newprojects.99acres.com/projects/shree_ashapura_realtors/shree_samarth_aura/images/hvmq23u_1709224810_476725078_med.jpg" alt="" />
          </div>
          <div className="rooms-desp">
            <h3> <span>Raunak Niwas</span></h3>
            <p>01, Ganesh Yadav Chawl, Farid Nagar, Bhandup(w) 400078</p>
            <div className="price-inline">
              <div className="rooms-border">Rs 14000<h6>Rent</h6></div>
              <div className="rooms-border">550 sq.ft</div>
            </div>
            <div className="room-highness"><span> Near to station</span></div>
          </div>
        </div>
        <div className="home-card">
          <div className="room-img-sec">
            <div className="room-tag"><span ><i class="fa-solid fa-check"></i>Verified</span><span><i class="fa-regular fa-heart"></i></span></div>
            <img className="home-img" src="https://newprojects.99acres.com/projects/shree_ashapura_realtors/shree_samarth_aura/images/hvmq23u_1709224810_476725078_med.jpg" alt="" />
          </div>
          <div className="rooms-desp">
            <h3> <span>Raunak Niwas</span></h3>
            <p>01, Ganesh Yadav Chawl, Farid Nagar, Bhandup(w) 400078</p>
            <div className="price-inline">
              <div className="rooms-border">Rs 14000<h6>Rent</h6></div>
              <div className="rooms-border">550 sq.ft</div>
            </div>
            <div className="room-highness"><span> Near to station</span></div>
          </div>
        </div>
        <div className="home-card">
          <div className="room-img-sec">
            <div className="room-tag"><span ><i class="fa-solid fa-check"></i>Verified</span><span><i class="fa-regular fa-heart"></i></span></div>
            <img className="home-img" src="https://newprojects.99acres.com/projects/shree_ashapura_realtors/shree_samarth_aura/images/hvmq23u_1709224810_476725078_med.jpg" alt="" />
          </div>
          <div className="rooms-desp">
            <h3> <span>Raunak Niwas</span></h3>
            <p>01, Ganesh Yadav Chawl, Farid Nagar, Bhandup(w) 400078</p>
            <div className="price-inline">
              <div className="rooms-border">Rs 14000<h6>Rent</h6></div>
              <div className="rooms-border">550 sq.ft</div>
            </div>
            <div className="room-highness"><span> Near to station</span></div>
          </div>
        </div>

      </div>

    </div>
    <div className="easy-acces">
      <div className="find-property">
        <h5>Find Property</h5>
        <div>Select from thousands of options, effortlessly </div>
        <button>Find Now</button>
      </div>

      <div className="find-property">
        <h5>List your Property</h5>
        <p>For free. Without any brokerage </p>
        <button>Find Now</button>
      </div>
    </div>
  </>
};

export default Page;

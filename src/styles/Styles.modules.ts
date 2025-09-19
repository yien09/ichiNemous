import styled from "styled-components"
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    /* margin: 0; */
    padding: 0;
    background-color: #0f1419; /* DARK MODE */
    /* color: #ffffff; */
    font-family: 'Poppins', sans-serif;
  }

  #root {
    background-color: #0f1419; /* Ensure root element is dark too */
  }
`;

export const MainWrapper = styled.div`
  background-color: #0f1419;
  min-height: 100vh;
  width: 100%;
`;


//!Header.tsx file Starts
export const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 999;
  background-color: #0f1419; // Dark navbar background
  border-bottom: 1px solid #2a2a2a; // Subtle border for definition
  padding: 0 1rem;

  .logo{
    color: #ffffff;
    font-family: 'Black Ops One', serif;
    font-size: 2.5rem;
    letter-spacing: 2px;
    background: linear-gradient(to right, #00d4ff, #00ff94); // Bright blue to green gradient
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .navLinks{
    margin-left: 10em;
  }

  .loginBtn{
    margin-left: auto;
  }

  .navLinks a.active{
    border-radius: 10px;
    border-top: 3px solid #00d4ff; // Accent blue
    border-bottom: 3px solid #00d4ff;
    color: #ffffff;
    margin: 20px 0;
    padding: 7px 0;
  }

  .links{
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    color: #e0e0e0; // Light gray for better contrast
    border-radius: 5px;
    transition: transform 0.5s ease-in-out;

    &:hover{
      transform: scale(1.07);
      color: #00d4ff; // Bright blue on hover
    }
  }

  .searchContainer {
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: 16px;
  }

  .searchContainer form {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .searchContainer input {
    height: 40px;
    outline: none;
    border: 1px solid #888888;
    border-radius: 20px;
    box-shadow: 1px 1px 6px 2px rgba(0, 0, 0, 0.5);
    padding: 0 15px;
    font-size: 15px;
    min-width: 400px;
    background-color: #1a1a1a;
    color: #ffffff;

    &::placeholder {
      font-size: 14px;
      color: #888888;
    }

    &:focus {
      box-shadow: 1px 1px 8px 3px rgba(0, 212, 255, 0.3);
      border-color: #00d4ff;
    }
  }

  @media (max-width: 1060px) {
    .logo{
      font-size: 1.6rem;
    }

    .links, .loginBtn{
      font-size: 12px;
    }

    .searchContainer {
      margin-left: 8px;
      margin-right: 8px;
    }

    .searchContainer input {
      min-width: 180px;
      font-size: 13px;
    }

    .searchContainer button {
      padding: 0 15px;
      font-size: 12px;
    }
  }
`;
//!Header.tsx file Ends


//!DisplayItems.tsx Starts
export const MovieShowsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  margin-top: 5rem;
  padding: 10px;
  box-shadow: 0 5px 5px -5px rgba(0,0,0,0.7);
  background-color: #0f1419;
  color: #ffffff;

  .loadingOverlay{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(15, 20, 25, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #ffffff;
    z-index: 9999;

    >p{
      font-size: 2rem;
      margin-top: 1rem;
      font-family: 'Poppins', sans-serif;
      letter-spacing: 2px;
      color: #00d4ff;
    }
  }

  .movieHeading{
    width: 100%;
    font-family: 'Poppins', sans-serif;
    margin-left: 2rem;
    color: #ffffff;

    >h1{
      margin-bottom: 1.5rem;
      color: #ffffff;
    }
  }

  .movieCard{
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;

    .movie{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      transition: all .5s ease-in-out;
      margin-bottom: 3rem;
      background-color: #1a1a1a;
      border-radius: 10px;
      padding: 15px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

      .movieImage{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        cursor: pointer;

        >img{
          border-radius: 5px;
          border-top-right-radius: 15px;
          border-bottom-left-radius: 15px;
          box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.5);
          padding: 5px;
        }
        >span{
          border: none;
          height: 35px;
          width: 35px;
          border-radius: 360px;
          background-color: #00d4ff;

          display: flex;
          justify-content: center;
          align-items: center;
          align-self: center;
          color: #0f1419;
          padding: 5px;
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          font-weight: bold;
          position: relative;
          bottom: 25px;
        }
      }

      &:hover{
        transform: scale(1.04);
        box-shadow: 0 6px 16px rgba(0, 212, 255, 0.2);
      }
    }

    .movieInfo{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 0;
      position: relative;
      bottom: 10px;

      >h4{
        margin-bottom: 0;
        width: 230px;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 15px;
        color: #ffffff; // White title
      }
      >p{
        margin: 8px 0;
        color: #aaaaaa;
        border-bottom: 1px solid #444444;
      }
    }

    .buttons{
      text-align: center;
      border: none;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 70%;
      margin: 10px;

      >p{
        font-family: 'Poppins', sans-serif;
        color: #ffffff;
      }
      .btnPrev, .btnNext{
        border: none;
        outline: none;
        color: #ffffff;
        font-size: 18px;
        font-weight: bold;
        font-family: 'Poppins', sans-serif;
        background-color: #333333;
        border-radius: 5px;
        padding: 10px 20px;
        transition: all 0.3s ease;

        &:hover{
          background-color: #00d4ff;
          color: #0f1419;
          cursor: pointer;
        }
      }
    }
  }
`;
//!DisplayItems.tsx Ends


//*CoverPage.tsx Starts
export const Cover = styled.div`
  text-align: center;
  width: 100%;
  /* margin: 10px 0 0 0; */
  position: relative;
  /* text-transform: capitalize; */

  .coverText{
    position: absolute;
    color: #ffffff;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 30%;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    letter-spacing: 3px;
    line-height: 1.5;

    >h1{
      position: relative;
      font-size: 3rem;
      font-family: 'Roboto', sans-serif;
      color: #ffffff;
      background: linear-gradient(to right, #00d4ff, #00ff94);
      background-clip: text;
      /* -webkit-text-fill-color: transparent; */
    }

    >p{
      font-size: 20px;
      color: #e0e0e0; // Light gray
    }
    
    >em{
      font-size: 15px;
      margin-top: 10px;
      color: #cccccc; // Medium gray
    }
  }
  
  &::before{
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 500px;
    background-color: rgba(15, 20, 25, 0.8);
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
  }

  /* Image wrapper for gradient line */
  .imageWrapper {
    position: relative;
    width: 100%;
    justify-self: center;
    
    >img {
      height: 500px;
      width: 100%;
      filter: brightness(0.8);
      display: block;
      object-fit: cover;
      object-position: 100% 20%;
      border-image: linear-gradient(to right,
        #7928ca 25%,
        #1e40af 50%,
        #1e40af 50%,
        #0891b2 75%,
        #059669 100%) 1;
      border-style: solid;
      border-width: 5px;
      opacity: 25%;
      box-shadow: #ffffff 0 15px 20px;
    }
  }

  /* Fallback for direct img w/o wrapper */
  >img{
    height: 700px;
    width: 100%;
    align-items: center;
    filter: brightness(0.8);
  }

  @media(max-width: 1020px){
    .coverText{
      letter-spacing: 1px;
      line-height: 0.2;
      >h1{
        font-size: 2.2rem;
      }
      >p, >em{
        font-size: 15px;
      }
    }
    &::before {
      height: 300px;
    }
    
    .imageWrapper > img,
    > img {
      height: 300px;
    }
  }

  @media(max-width: 800px){
    width: 100%;
    margin: 5.2rem auto 0;
    .coverText{
      line-height: 1;
      >h1{
        font-size: 2.2rem;
      }
      >p, >em{
        font-size: 15px;
      }
    }
    &::before{
      height: 300px;
      /* border-bottom-left-radius: 0;
      border-bottom-right-radius: 0; */
    }
  }
`;

/* Styled component untuk gradient line */
export const GradientLine = styled.div`
  height: 60px;
  background: linear-gradient(
    90deg,
    #ff0080 0%,
    #7928ca 25%,
    #1e40af 50%,
    #0891b2 75%,
    #059669 100%
  );
  width: 100%;
  overflow: hidden;
  border-top-left-radius: 100% 80px;
  border-top-right-radius: 100% 80px;
  transform: scaleY(-1);
  position: relative;
  z-index: 4;
`;
//*CoverPage.tsx Ends
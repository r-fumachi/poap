import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { TokenInfo, getTokenInfo } from '../api';
import HeaderShadowImg from '../images/header-shadow.svg';
import HeaderShadowDesktopImg from '../images/header-shadow-desktop.svg';
import TelegramImg from '../images/telegram.svg';
import TwitterImg from '../images/twitter.svg';
import { useBodyClassName } from '../react-helpers';
import { Link } from 'react-router-dom';

type TokenPageState = {
  token: null | TokenInfo;
};

export const TokenDetailPage: React.FC<
  RouteComponentProps<{
    tokenId: string;
  }>
> = ({ location, match }) => {
  useBodyClassName('poap-app event-page');
  const [token, setToken] = useState<null | TokenInfo>(null);
  useEffect(() => {
    const fn = async () => {
      if (location.state) {
        setToken(location.state);
      } else {
        const token = await getTokenInfo(match.params.tokenId);
        setToken(token);
      }
    };
    fn();
  }, [location, match]);

  if (token == null) {
    return (
      <div className="content-event" data-aos="fade-up" data-aos-delay="300">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div className="header-events">
        <div className="container">
          <h1>{token.event.name}</h1>
          <p>
            {token.event.city}, {token.event.country}
            <br />
            <b>{token.event.start_date}</b>
          </p>
          <div className="logo-event" data-aos="fade-up">
            <img src={token.event.image_url} alt="Event" />
          </div>
        </div>
      </div>
      <main id="site-main" role="main" className="main-events">
        <div className="image-main">
          <img src={HeaderShadowImg} alt="" className="mobile" />
          <img src={HeaderShadowDesktopImg} alt="" className="desktop" />
        </div>
        <div className="main-content">
          <div className="container">
            <div className="content-event" data-aos="fade-up" data-aos-delay="300">
              <h2>Owner</h2>
              <p className="wallet-number">
                <Link to={`/scan/${token.owner}`}>{token.owner}</Link>
              </p>
              <h2>Brog on the interwebz</h2>
              <ul className="social-icons">
                <li>
                  <a href="">
                    <img src={TwitterImg} alt="Twitter" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={TelegramImg} alt="Telegram" />
                  </a>
                </li>
                {/* <li>
                  <a href="#">
                    <img src="assets/images/twitter.svg" alt="Twitter" />
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

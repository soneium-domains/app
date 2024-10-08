import { ImageResponse } from '@vercel/og';
import { AVATAR_API_URL, AVATAR_PREVIEW_URL } from 'core/utils/constants';
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

const OgImageHandler = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name') || 'Soneium User';
  const title = searchParams.get('title') || 'Soneium Domains';
  const subtitle = searchParams.get('subtitle') || 'Soneium Domains';
  const avatar = searchParams.get('avatar');
  const bg = searchParams.get('bg');  
  const lightMode = searchParams.get('lightmode') || false;

  const fontDataBold = await fetch(
    new URL('assets/fonts/PoppinsBold.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer());

  const fontData = await fetch(
    new URL('assets/fonts/PoppinsRegular.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer());

  // const blob = await response.blob();
  // const url = URL.createObjectURL(blob);
  //console.log(url)
  return new ImageResponse(
    (
      <div
        style={{
          background: bg ? bg : lightMode === "true" ? '#f5f5f5' : '#000000',
          width: '100%',
          height: '100%',
          textAlign: 'center',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily:'Poppins',
          flexDirection: 'row',
          display: 'flex',
        }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
       {avatar && <img
          alt={name + ' Avatar Image'}
          width={300}
          height={300}
          src={avatar ? AVATAR_API_URL + name : AVATAR_PREVIEW_URL + name}
          style={{ margin: '0 75px', borderRadius: '100%' }}
        />}
        <div
          style={{
            flexDirection: 'column',
            display: 'flex',
          }}>
            {title !== '' && <p
            style={{
              fontSize: 40,
              fontFamily: 'PoppinsBold',
              lineHeight: 1.1,
              maxWidth: 450,
              color: lightMode === "true" ? '#161618' : '#f5f5f5',
              textAlign: 'left'
            }}>
            {title}
          </p>}
          {subtitle !== '' && <p
            style={{
              fontSize: 30,
              lineHeight: 1.1,
              color: lightMode === "true" ? '#00000077' : '#ffffff77',
              maxWidth: 450,
              textAlign: 'left'
            }}>
            {subtitle}
          </p>}
          <p
            style={{
              fontSize: 36,
              lineHeight: 1.1,
              maxWidth: 450,
              color: lightMode === "true" ? '#161618' : '#f5f5f5',
              textAlign: 'left'
            }}>
            {name}
          </p>
          
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: 'Poppins',
          data: fontData,
          style: 'normal',
        },
        {
          name: 'PoppinsBold',
          data: fontDataBold,
          style: 'normal'
        },
      ],
    }
  );
};

export default OgImageHandler;

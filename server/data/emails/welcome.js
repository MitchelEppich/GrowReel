exports.welcome = input => {
  return {
    from: '"GrowReel Team" <no_reply@growreel.com>',
    to: input.email,
    subject: "Welcome to GrowReel",
    html: `<table style="background-color:#000000; display:block; padding: 15px;  min-height: 400px; width: 100%"><tbody style="background-color:#000000; width: 100%"> 
    <tr>        
        <td style="color:white; display:block; width: 400px;">
            <a href="https://growreel.com" target="_blank"><img src="https://growreel.com/static/images/GrowReelLogoHorizontal.png" style="padding-top: 10px; padding-bottom: 10px;"/></a>            
        
        <td style="color:white; display:block; max-width: 700px">
            <h3 style="color: white;">Welcome ${input.username}!</h3>
            <p style="padding: 5px; margin-bottom: 15px; color: white;">
            Thank you for joining us. We're glad you're here! We hope you can learn a lot and help to grow our community with great videos!</p>
            <p>Here is your information:</p>
            <p style="padding: 5px; margin-bottom: 45px; color: white;"><small><b>Username:</b> ${input.username}</small></p>
            <a href="https://growreel.com" style="text-align: center; background-color: #5da73c; border: 0; font-size: 15px; margin: 1rem 2rem; padding: 10px 40px; color: white; border-radius: 2px; text-decoration: none">Click here to Login!</a>
            <p style="padding: 5px; margin-top: 40px; color:white;">If you did not request a password reset, please ignore this email or reply to let us know. If you have any comments or questions, please don't hesitate to reach us on our report form.</p>
            <p style="padding: 5px; color:white; margin-top: 40px;"><i>Cheers, GrowReel Team</i></p>
            <small><p style="color:white;">Follow us:</p>
            <ul style="display:inline-block; color:white; margin: 0; padding: 0;">
              <li style="display:inline-block; color:white; margin: 0;">
                <a style="color: #5da73c; margin-bottom: 10px;" href="https://www.facebook.com/"><i>Facebook</i>
              </a>
              </li>
              <li style="display:inline-block; color:white; margin: 0; padding: 0;">
                <a style="color: #5da73c; margin-bottom: 10px;" href="https://www.instagram.com/"><i>Instagram</i>
              </a>
              </li>
              <li style="display:inline-block; color:white; margin: 0; padding: 0;">
                <a style="color: #5da73c; margin-bottom: 10px;" href="https://twitter.com/"><i>Twitter</i>
              </a>
              </li>
            </ul>
            </small>
            <p style="color: #383838; margin-top: 25px; font-weight: bold; font-size: 12px; padding: 5px;">©2018 GrowReel All rights reserved.</p>
            </td>               
          </tr>               
        </table>`
  };
};
// exports.welcome = input => {
//   return {
//     from: '"GrowReel_NoReply" <no_reply@growreel.com>',
//     to: input.email,
//     subject: "Welcome to GrowReel",
//     html: `<div style="background-color:black; min-height: 400px; color:white; font-size: 16px;  padding:15px;">
//         <div style="color:white;">
//             <a href="https://growreel.com" target="_blank"><img src="https://growreel.com/static/images/GrowReelLogoHorizontal.png" style="padding-top: 10px; padding-bottom: 10px;"/></a>
//         </div><hr style="border: 2px solid rgba(76, 76, 76, 0.18);">
//         <div style="color:white; max-width: 700px">
//             <h3 style="color: white;">Welcome ${input.username}!</h3>
//             <p style="padding: 5px; margin-bottom: 15px; color: white;">
//             Thank you for joining us. We're glad you're here! We hope you can learn a lot and help to grow our community with great videos!</p>
//             <p>Here is your information:</p>
//             <p style="padding: 5px; margin-bottom: 45px; color: white;"><small><b>Username:</b> ${
//               input.username
//             }</small></p>
//             <a href="https://growreel.com" style="text-align: center; background-color: #5da73c; border: 0; font-size: 15px; margin: 1rem 2rem; padding: 10px 40px; color: white; border-radius: 2px; text-decoration: none">Click here to Login!</a>
//             <p style="padding: 5px; margin-top: 60px;">If you have any comments or questions, please don't hesitate to reach us at <a href="mailto:support@growreel.com" style="color: #5da73c">support@growreel.com</a></p>
//             <p style="padding: 5px; color:white; margin-top: 40px;"><i>Cheers, GrowReel Team</i></p>
//             <small><p style="color:white;">Follow us:</p>
//             <ul style="display:inline-block; color:white; margin: 0;">
//               <li style="display:inline-block; color:white; margin: 0; padding: 0;">
//                 <a style="color: #5da73c; margin-bottom: 10px;" href="http://www.growreel.com.br/password"><i>Facebook</i>
//               </a>
//               </li>
//               <li style="display:inline-block; color:white; margin: 0; padding: 0;">
//                 <a style="color: #5da73c; margin-bottom: 10px;" href="http://www.growreel.com.br/password"><i>Instagram</i>
//               </a>
//               </li>
//               <li style="display:inline-block; color:white; margin: 0; padding: 0;">
//                 <a style="color: #5da73c; margin-bottom: 10px;" href="http://www.growreel.com.br/password"><i>Twitter</i>
//               </a>
//               </li>
//             </ul>
//             </small>
//             <p style="color: #383838; margin-top: 25px; font-weight: bold; font-size: 12px; padding: 5px;">©2018 GrowReel All rights reserved.</p>
//         </div>
//       </div>`
//   };
// };

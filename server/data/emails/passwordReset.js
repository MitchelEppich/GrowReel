exports.passwordReset = input => {
  return {
    from: '"GrowReel Team" <no_reply@growreel.com>',
    to: input.email,
    subject: "Password Reset Request",
    html: `<table style="background-color:#000000; display:block; padding: 15px;  min-height: 400px; width: 100%"><tbody style="background-color:#000000; width: 100%"> 
    <tr>        
        <td style="color:white; display:block; width: 400px;">
            <a href="https://growreel.com" target="_blank"><img src="https://growreel.com/static/images/GrowReelLogoHorizontal.png" style="padding-top: 10px; padding-bottom: 10px;"/></a>
            <h3 style="color: white;">Hello ${input.username},</h3>
            <p style="padding: 5px; margin-bottom: 40px; color: white;">
            You recently requested to reset your password for your GrowReel account. Please, click the button below to reset it.</p>            
            <a href="${input.url}" style="text-align: center; background-color: #5da73c; border: 0; font-size: 15px; margin: 1rem 2rem; width: 250px; padding-bottom: 10px; padding-top: 10px; padding-right: 40px; padding-left: 40px; color: white; border-radius: 2px; text-decoration: none">Reset your Password</a>
            <p style="padding: 5px; margin-top: 40px; color:white;">If you did not request a password reset, please ignore this email or reply to let us know. If you have any comments or questions, please don't hesitate to reach us on our report form.</p>
            <p style="padding: 5px; margin-top: 25px; color: white;"><i>Cheers, GrowReel Team</i></p>
            <small><p style="color:white;">If you're having trouble clicking the password reset button, copy and paste this URL into your web browser: <a style="color: #5da73c; margin-bottom: 10px;" href="${input.url}"> <i>${input.url}</i>
            </a></small> </p>
            <small><p style="color:white; margin-top: 20px;">Follow us:</p>
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
            <p style="color: #383838; margin-top: 5px; font-weight: bold; font-size: 12px; padding: 5px;">©2018 GrowReel All rights reserved.</p>
        </td>               
      </tr> 
      </tbody>              
    </table>`
  };
};


/*********** CONVERTED TABLE *********/

{/* <table style="background-color:#000000" border="0">  
    <th style="background-color:#000000; min-height: 400px; color:white !important; font-size: 16px; padding:15px;" border="0">        
        <th style="color:white;">
            <a href="https://growreel.com" target="_blank"><img src="https://growreel.com/static/images/GrowReelLogoHorizontal.png" style="padding-top: 10px; padding-bottom: 10px;"/></a>            
        </th><hr style="border: 2px solid rgba(76, 76, 76, 0.18);">
        <th style="color:white; max-width: 700px">
            <h3 style="color: white;">Hello ${input.username},</h3>
            <p style="padding: 5px; margin-bottom: 40px; color: white;">
            You recently requested to reset your password for your GrowReel account. Please, click the button below to reset it.</p>            
            <a href="${input.url}" style="text-align: center; background-color: #5da73c; border: 0; font-size: 15px; margin: 1rem 2rem; padding: 10px 40px; color: white; border-radius: 2px; text-decoration: none">Reset your Password</a>
            <p style="padding: 5px; margin-top: 40px; color:white;">If you did not request a password reset, please ignore this email or reply to let us know. If you have any comments or questions, please don't hesitate to reach us on our report form.</p>
            <p style="padding: 5px; margin-top: 25px; color: white;"><i>Cheers, GrowReel Team</i></p>
            <small><p style="color:white;">If you're having trouble clicking the password reset button, copy and paste this URL into your web browser: <a style="color: #5da73c; margin-bottom: 10px;" href="${input.url}"> <i>${input.url}</i>
            </a></small> </p>
            <small><p style="color:white; margin-top: 20px;">Follow us:</p>
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
            <p style="color: #383838; margin-top: 5px; font-weight: bold; font-size: 12px; padding: 5px;">©2018 GrowReel All rights reserved.</p>
       </th>   
      </tr>     
      </table> */}















// exports.passwordReset = input => {
//   return { from: '"GrowReel_NoReply" <no_reply@growreel.com>', to: input.email, subject: "Password Reset Request", html: `<div style="background-color:black; min-height: 400px; color:white !important; font-size: 16px; padding:15px;">
//         <div style="color:white;">
//             <a href="https://growreel.com" target="_blank"><img src="https://growreel.com/static/images/GrowReelLogoHorizontal.png" style="padding-top: 10px; padding-bottom: 10px;"/></a>
//         </div><hr style="border: 2px solid rgba(76, 76, 76, 0.18);">
//         <div style="color:white; max-width: 700px">
//             <h3 style="color: white;">Hello ${input.username},</h3>
//             <p style="padding: 5px; margin-bottom: 40px; color: white;">
//             You recently requested to reset your password for your GrowReel account. Please, click the button below to reset it.</p>
//             <a href="${input.url}" style="text-align: center; background-color: #5da73c; border: 0; font-size: 15px; margin: 1rem 2rem; padding: 10px 40px; color: white; border-radius: 2px; text-decoration: none">Reset your Password</a>
//             <p style="padding: 5px; margin-top: 40px; color:white;">If you did not request a password reset, please ignore this email or reply to let us know. If you have any comments or questions, please don't hesitate to reach us at <a href="mailto:support@growreel.com" style="color: #5da73c">support@growreel.com</a></p>
//             <p style="padding: 5px; margin-top: 25px; color: white;"><i>Cheers, GrowReel Team</i></p>
//             <small><p style="color:white;">If you're having trouble clicking the password reset button, copy and paste this URL into your web browser: <a style="color: #5da73c; margin-bottom: 10px;" href="http://www.growreel.com.br/password"> <i>http://www.growreel.com.br/password</i>
//             </a></small> </p>
//             <small><p style="color:white; margin-top: 20px;">Follow us:</p>
//             <ul style="display:inline-block; color:white; margin: 0; padding: 0;">
//               <li style="display:inline-block; color:white; margin: 0;">
//                 <a style="color: #5da73c; margin-bottom: 10px;" href="https://www.facebook.com/"><i>Facebook</i>
//               </a>
//               </li>
//               <li style="display:inline-block; color:white; margin: 0; padding: 0;">
//                 <a style="color: #5da73c; margin-bottom: 10px;" href="https://www.instagram.com/"><i>Instagram</i>
//               </a>
//               </li>
//               <li style="display:inline-block; color:white; margin: 0; padding: 0;">
//                 <a style="color: #5da73c; margin-bottom: 10px;" href="https://twitter.com/"><i>Twitter</i>
//               </a>
//               </li>
//             </ul>
//             </small>
//             <p style="color: #383838; margin-top: 5px; font-weight: bold; font-size: 12px; padding: 5px;">©2018 GrowReel All rights reserved.</p>
//        </div>
//       </div>` };
// };

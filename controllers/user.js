// const db                          = require("../helpers/db");
// const passwordHelper              = require('../helpers/passwordHelper');
// const { check, validationResult } = require('express-validator');
// let userType                      = require("../config/userTypes");
// const {userValidator,checkUser}   = require('../validators/users');
// const statuses                    = require('../config/status');
// let mailer                        = require('../helpers/mailer');
// const randomKey                   = require('../helpers/randomizer');
// let update                        = require("../helpers/qUpdater")();
// let slugger                       = require("../helpers/slugger");
// let error                         = require('../config/errorMessages');
//
// module.exports = class  user {
//   static create(req,res) {
//     let validationKey;
//     let hashedPassword;
//     //Validator
//     userValidator(req,res).then(()=>{
//       return randomKey(15)
//
//     }).then((key)=>{
//       validationKey   = key;
//       hashedPassword  = passwordHelper.hash(req.body.password);
//
//       let query = "INSERT INTO users (name,email,password,reset_key,status) VALUES (?,?,?,?,?)";
//       let values = [req.body.name, req.body.email, hashedPassword,validationKey,statuses.unverified];
//       return db.query(query, values)
//     }).then((result)=>{
//       let mail = new mailer();https://cowfunding.com.ng/
//       //   //TODO change url from hardcoded to soft coded
//       mail.recipient(req.body.email).subject('EasyCow Email Verification')
//                   .html(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
// <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:border-radius="http://www.w3.org/1999/xhtml">
//
// <head>
// 	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
// 	<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />
// 	<meta name="viewport" content="width=600,initial-scale = 2.3,user-scalable=no">
// 	<!--[if !mso]>
// 	<link href='https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700' rel="stylesheet">
// 	<link href='https://fonts.googleapis.com/css?family=Quicksand:300,400,700' rel="stylesheet">
// 	<script src="https://kits.fontawesome.com/35eb9896ab.js"></script>
// 	<![endif]-->
//
// 	<title>CowFunding | Verify</title>
// chiemeke.ifeanyi@gmail.com
// 	<style type="text/css">
// 		body {
// 			width: 100%;
// 			background-color: #ffffff;
// 			margin: 0;
// 			padding: 0;
// 			-webkit-font-smoothing: antialiased;
// 			mso-margin-top-alt: 0px;
// 			mso-margin-bottom-alt: 0px;
// 			mso-padding-alt: 0px 0px 0px 0px;
// 		}
//
// 		p,
// 		h1,
// 		h2,
// 		h3,
// 		h4 {
// 			margin-top: 0;
// 			margin-bottom: 0;
// 			padding-top: 0;
// 			padding-bottom: 0;
// 		}
//
// 		span.preheader {
// 			display: none;
// 			font-size: 1px;
// 		}
//
// 		html {
// 			width: 100%;
// 		}
//
// 		table {
// 			font-size: 14px;
// 			border: 0;
// 		}
//
// 		/* ----------- responsivity ----------- */
//
// 		@media only screen and (max-width: 640px) {
// 			/*------ top header ------ */
// 			.main-header {
// 				font-size: 20px !important;
// 			}
// 			.main-section-header {
// 				font-size: 28px !important;
// 			}
// 			.show {
// 				display: block !important;
// 			}
// 			.hide {
// 				display: none !important;
// 			}
// 			.align-center {
// 				text-align: center !important;
// 			}
// 			.no-bg {
// 				background: none !important;
// 			}
// 			/*----- main image -------*/
// 			.main-image img {
// 				width: 440px !important;
// 				height: auto !important;
// 			}
// 			/* ====== divider ====== */
// 			.divider img {
// 				width: 440px !important;
// 			}
// 			/*-------- container --------*/
// 			.container590 {
// 				width: 440px !important;
// 			}
// 			.container580 {
// 				width: 400px !important;
// 			}
// 			.main-button {
// 				width: 220px !important;
// 			}
// 			/*-------- secions ----------*/
// 			.section-img img {
// 				width: 320px !important;
// 				height: auto !important;
// 			}
// 			.team-img img {
// 				width: 100% !important;
// 				height: auto !important;
// 			}
// 		}
//
// 		@media only screen and (max-width: 479px) {
// 			/*------ top header ------ */
// 			.main-header {
// 				font-size: 18px !important;
// 			}
// 			.main-section-header {
// 				font-size: 26px !important;
// 			}
// 			/* ====== divider ====== */
// 			.divider img {
// 				width: 280px !important;
// 			}
// 			/*-------- container --------*/
// 			.container590 {
// 				width: 280px !important;
// 			}
// 			.container590 {
// 				width: 280px !important;
// 			}
// 			.container580 {
// 				width: 260px !important;
// 			}
// 			/*-------- secions ----------*/
// 			.section-img img {
// 				width: 280px !important;
// 				height: auto !important;
// 			}
// 		}
//
// 	</style>
// 	<!--[if gte mso 9]><style type=”text/css”>
//         body {
//         font-family: arial, sans-serif!important;
//         }
//         </style>
//     <![endif]-->
// </head>
//
//
// <body class="respond" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
// 	<!-- pre-header -->
// 	<table style="display:none!important;">
// 		<tr>
// 			<td>
// 				<div style="overflow:hidden;display:none;font-size:1px;color:#ffffff;line-height:1px;font-family:Arial;maxheight:0px;max-width:0px;opacity:0;">
// 					Welcome to Our Family!
// 				</div>
// 			</td>
// 		</tr>
// 	</table>
// 	<!-- pre-header end -->
// 	<!-- header -->
// 	<table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff">
//
// 		<tr>
// 			<td align="center">
// 				<table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">
//
// 					<tr>
// 						<td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
// 					</tr>
//
// 					<tr>
// 						<td align="center">
//
// 							<table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">
//
// 								<tr>
// 									<td align="center" height="70" style="height:70px;">
// 										<a href="" style="display: block; border-style: none !important; border: 0 !important;"><img width="100" border="0" style="display: block; width: 130px;" src="http://cowfunding.com.ng/images/logo.png" alt="" /></a>
// 									</td>
// 								</tr>
//
//
// 							</table>
// 						</td>
// 					</tr>
//
// 					<tr>
// 						<td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
// 					</tr>
//
// 				</table>
// 			</td>
// 		</tr>
// 	</table>
// 	<!-- end header -->
//
// 	<!-- big image section -->
//
// 	<table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff" class="bg_color">
//
// 		<tr>
// 			<td align="center">
// 				<table border="0" align="center" width="590" cellpadding="0" cellspacing="0"  class="container590">
//
// 					<tr>
// 						<td align="center" style="color: #343434; font-size: 24px; font-family: Quicksand, Calibri, sans-serif; font-weight:700;letter-spacing: 3px; line-height: 35px;" class="main-header">
// 							<!-- section text ======-->
//
// 							<div style="line-height: 35px">
//
// 								Welcome to Our <span style="color: #77b112;">family</span>
//
// 							</div>
// 						</td>
// 					</tr>
//
// 					<tr>
// 						<td height="10" style="font-size: 10px; line-height: 10px;">&nbsp;</td>
// 					</tr>
//
// 					<tr>
// 						<td align="center">
// 							<table border="0" width="40" align="center" cellpadding="0" cellspacing="0" bgcolor="eeeeee">
// 								<tr>
// 									<td height="2" style="font-size: 2px; line-height: 2px;">&nbsp;</td>
// 								</tr>
// 							</table>
// 						</td>
// 					</tr>
//
// 					<tr>
// 						<td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td>
// 					</tr>
//
// 					<tr>
// 						<td align="left">
// 							<table border="0" width="590" align="center" cellpadding="0" cellspacing="0" class="container590">
// 								<tr>
// 									<td align="left" style="color: #888888; font-size: 16px; font-family: 'Work Sans', Calibri, sans-serif; line-height: 24px;">
// 										<!-- section text ======-->
//
// 										<p style="line-height: 24px; margin-bottom:15px;">
//
// 											Hello, ${req.body.name}
//
// 										</p>
// 										<p style="line-height: 24px;margin-bottom:15px;">
// 											Congratulations,you are one click away from being able to invest on <span style="color:#77b112"> CowFunding.</span>
// 										</p>
// 										<p style="line-height: 24px; margin-bottom:20px;">
// 											Click the button below to verify your e-mail.
// 										</p>
// 										<table border="0" align="center" width="180" cellpadding="0" border-radius: 26px cellspacing="0" bgcolor="#77b112" style="margin-bottom:20px;">
//
// 											<tr>
// 												<td height="10" style="font-size: 10px; line-height: 10px;">&nbsp;</td>
// 											</tr>
//
// 											<tr>
// 												<td align="center" style="color: #ffffff;   font-size: 14px; font-family: 'Work Sans', Calibri, sans-serif; line-height: 22px; letter-spacing: 2px;">
// 													<!-- main section button -->
//
// 													<div style="line-height: 22px;">
// 														<a href="${process.env.APP_URL}/user/verify?email=${req.body.email}&key=${validationKey}">click here to verify
// </a>
// 													</div>
// 												</td>
// 											</tr>
//
// 											<tr>
// 												<td height="10" style="font-size: 10px; line-height: 10px;">&nbsp;</td>
// 											</tr>
//
// 										</table>
// 										<p style="line-height: 24px">
// 											Love, </br> <span style="color:#77b112"> The Cowfunding Team</span>
//
// 										</p>
//
// 									</td>
// 								</tr>
// 							</table>
// 						</td>
// 					</tr>
// 				</table>
//
//
// 		<tr>
// 			<td height="40" style="font-size: 40px; line-height: 40px;">&nbsp;</td>
// 		</tr>
//
// 	</table>
//
// 	<!-- end section -->
//
//
// 	<!-- main section -->
//
// 	<!-- end section -->
//
// 	<!-- contact section -->
// 	<table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff" class="bg_color">
//
// 		<tr>
// 			<td height="60" style="font-size: 60px; line-height: 60px;">&nbsp;</td>
// 		</tr>
//
// 		<tr>
// 			<td align="center">
// 				<table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590 bg_color">
//
// 					<tr>
// 						<td align="center">
// 							<table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590 bg_color">
//
// 								<tr>
// 									<td>
// 										<table border="0" width="300" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">
//
// 											<tr>
// 												<!-- logo -->
// 												<td align="left">
// 													<a href="" style="display: block; border-style: none !important; border: 0 !important;"><img width="80" border="0" style="display: block; width: 80px;" src="http://cowfunding.com.ng/images/logo.png" alt="" /></a>
// 												</td>
// 											</tr>
//
// 											<tr>
// 												<td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
// 											</tr>
//
// 											<tr>
// 												<td align="left" style="color: #888888; font-size: 14px; font-family: 'Work Sans', Calibri, sans-serif; line-height: 23px;" class="text_color">
// 													<div style="color: #333333; font-size: 14px; font-family: 'Work Sans', Calibri, sans-serif; font-weight: 600; mso-line-height-rule: exactly; line-height: 23px;">
//
// 														Email us: <br/> <a href="mailto:" style="color: #77b112; font-size: 14px; font-family: 'Hind Siliguri', Calibri, Sans-serif; font-weight: 400;">info@cowfunding.com.ng</a>
//
// 													</div>
// 												</td>
// 											</tr>
//
// 										</table>
//
// 										<table border="0" width="2" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">
// 											<tr>
// 												<td width="2" height="10" style="font-size: 10px; line-height: 10px;"></td>
// 											</tr>
// 										</table>
//
// 										<table border="0" width="200" align="right" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">
//
// 											<tr>
// 												<td class="hide" height="45" style="font-size: 45px; line-height: 45px;">&nbsp;</td>
// 											</tr>
//
//
//
// 											<tr>
// 												<td height="15" style="font-size: 15px; line-height: 15px;">&nbsp;</td>
// 											</tr>
//
//
//
// 										</table>
// 									</td>
// 								</tr>
// 							</table>
// 						</td>
// 					</tr>
// 				</table>
// 			</td>
// 		</tr>
//
// 		<tr>
// 			<td height="60" style="font-size: 60px; line-height: 60px;">&nbsp;</td>
// 		</tr>
//
// 	</table>
// 	<!-- end section -->
//
// 	<!-- footer ====== -->
// 	<table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="f4f4f4">
//
// 		<tr>
// 			<td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
// 		</tr>
//
// 		<tr>
// 			<td align="center">
//
// 				<table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">
//
// 					<tr>
// 						<td>
// 							<table border="0" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">
// 								<tr>
// 									<td align="left" style="color: #aaaaaa; font-size: 14px; font-family: 'Work Sans', Calibri, sans-serif; line-height: 24px;">
// 										<div style="line-height: 24px;">
//
// 											<span class="text-center" style="color: #333333;">CowFunding by Selema Farms</span>
//
// 										</div>
// 									</td>
// 								</tr>
// 							</table>
//
// 							<table border="0" align="left" width="5" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">
// 								<tr>
// 									<td height="20" width="5" style="font-size: 20px; line-height: 20px;">&nbsp;</td>
// 								</tr>
// 							</table>
//
// 							<table border="0" align="right" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">
//
// 								<tr>
// 									<td>
// 										<table border="0" align="right" cellpadding="0" cellspacing="0">
// 											<tr>
// 												<td>
// 													<a href="https://www.facebook.com/selemafarmsng/?ref=bookmarks" style="display: block; border-style: none !important; border: 0 !important;"><i class="fa fa-facebook-square" style="font-size: 40px; color:#77b112 "></i></a>
// 												</td>
// 												<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
// 												<td>
// 													<a href="https://twitter.com/selema_farms" style="display: block; border-style: none !important; border: 0 !important;"><i class="fa fa-twitter-square" style="font-size: 40px; color:#77b112 "></i></a>
// 												</td>
// 												<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
// 												<td>
// 													<a href="https://www.linkedin.com/company/selemafarms/?viewAsMember=true" style="display: block; border-style: none !important; border: 0 !important;"><i class="fa fa-linkedin-square" style="font-size: 40px; color:#77b112 "></i></a>
// 												</td>
// 											</tr>
// 										</table>
// 									</td>
// 								</tr>
//
//
// 							</table>
// 						</td>
// 					</tr>
//
// 				</table>
// 			</td>
// 		</tr>
//
// 		<tr>
// 			<td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
// 		</tr>
//
// 	</table>
// 	<!-- end footer ====== -->
//
// </body>
//
// </html>
// `)
//                   .send(undefined,4);
//       res.withSuccess(201,"creation").reply();
//     }).catch(function (data) {
//       console.log(data);
//       return res.withServerError(500).reply();
//     })
//
//   }
//   //Send the verification email again in case it didn't get through and account is still unverified
//   static reVerify(req,res){
//     let validationKey;
//     //Regenerate Random key
//      randomKey(15).then((key)=>{
//        validationKey = key;
//       //Update users reset key only if he has and unverified status
//       let query = "UPDATE users SET reset_key = ? WHERE users.email = ? AND users.status = ?";
//       let values = [key,req.body.email,statuses.unverified];
//       return db.query(query,values)
//     }).then((response)=>{
//
//       let mail = new mailer();
//        mail.recipient(req.body.email).subject('EasyCow Email Verification')
//       //use pug templating engine
//           .html(`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
// <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:border-radius="http://www.w3.org/1999/xhtml">
//
// <head>
// 	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
// 	<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;" />
// 	<meta name="viewport" content="width=600,initial-scale = 2.3,user-scalable=no">
// 	<!--[if !mso]>
// 	<link href='https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700' rel="stylesheet">
// 	<link href='https://fonts.googleapis.com/css?family=Quicksand:300,400,700' rel="stylesheet">
// 	<script src="https://kits.fontawesome.com/35eb9896ab.js"></script>
// 	<![endif]-->
//
// 	<title>CowFunding | Verify</title>
//
// 	<style type="text/css">
// 		body {
// 			width: 100%;
// 			background-color: #ffffff;
// 			margin: 0;
// 			padding: 0;
// 			-webkit-font-smoothing: antialiased;
// 			mso-margin-top-alt: 0px;
// 			mso-margin-bottom-alt: 0px;
// 			mso-padding-alt: 0px 0px 0px 0px;
// 		}
//
// 		p,
// 		h1,
// 		h2,
// 		h3,
// 		h4 {
// 			margin-top: 0;
// 			margin-bottom: 0;
// 			padding-top: 0;
// 			padding-bottom: 0;
// 		}
//
// 		span.preheader {
// 			display: none;
// 			font-size: 1px;
// 		}
//
// 		html {
// 			width: 100%;
// 		}
//
// 		table {
// 			font-size: 14px;
// 			border: 0;
// 		}
//
// 		/* ----------- responsivity ----------- */
//
// 		@media only screen and (max-width: 640px) {
// 			/*------ top header ------ */
// 			.main-header {
// 				font-size: 20px !important;
// 			}
// 			.main-section-header {
// 				font-size: 28px !important;
// 			}
// 			.show {
// 				display: block !important;
// 			}
// 			.hide {
// 				display: none !important;
// 			}
// 			.align-center {
// 				text-align: center !important;
// 			}
// 			.no-bg {
// 				background: none !important;
// 			}
// 			/*----- main image -------*/
// 			.main-image img {
// 				width: 440px !important;
// 				height: auto !important;
// 			}
// 			/* ====== divider ====== */
// 			.divider img {
// 				width: 440px !important;
// 			}
// 			/*-------- container --------*/
// 			.container590 {
// 				width: 440px !important;
// 			}
// 			.container580 {
// 				width: 400px !important;
// 			}
// 			.main-button {
// 				width: 220px !important;
// 			}
// 			/*-------- secions ----------*/
// 			.section-img img {
// 				width: 320px !important;
// 				height: auto !important;
// 			}
// 			.team-img img {
// 				width: 100% !important;
// 				height: auto !important;
// 			}
// 		}
//
// 		@media only screen and (max-width: 479px) {
// 			/*------ top header ------ */
// 			.main-header {
// 				font-size: 18px !important;
// 			}
// 			.main-section-header {
// 				font-size: 26px !important;
// 			}
// 			/* ====== divider ====== */
// 			.divider img {
// 				width: 280px !important;
// 			}
// 			/*-------- container --------*/
// 			.container590 {
// 				width: 280px !important;
// 			}
// 			.container590 {
// 				width: 280px !important;
// 			}
// 			.container580 {
// 				width: 260px !important;
// 			}
// 			/*-------- secions ----------*/
// 			.section-img img {
// 				width: 280px !important;
// 				height: auto !important;
// 			}
// 		}
//
// 	</style>
// 	<!--[if gte mso 9]><style type=”text/css”>
//         body {
//         font-family: arial, sans-serif!important;
//         }
//         </style>
//     <![endif]-->
// </head>
//
//
// <body class="respond" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
// 	<!-- pre-header -->
// 	<table style="display:none!important;">
// 		<tr>
// 			<td>
// 				<div style="overflow:hidden;display:none;font-size:1px;color:#ffffff;line-height:1px;font-family:Arial;maxheight:0px;max-width:0px;opacity:0;">
// 					Welcome to Our Family!
// 				</div>
// 			</td>
// 		</tr>
// 	</table>
// 	<!-- pre-header end -->
// 	<!-- header -->
// 	<table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff">
//
// 		<tr>
// 			<td align="center">
// 				<table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">
//
// 					<tr>
// 						<td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
// 					</tr>
//
// 					<tr>
// 						<td align="center">
//
// 							<table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">
//
// 								<tr>
// 									<td align="center" height="70" style="height:70px;">
// 										<a href="" style="display: block; border-style: none !important; border: 0 !important;"><img width="100" border="0" style="display: block; width: 130px;" src="http://cowfunding.com.ng/images/logo.png" alt="" /></a>
// 									</td>
// 								</tr>
//
//
// 							</table>
// 						</td>
// 					</tr>
//
// 					<tr>
// 						<td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
// 					</tr>
//
// 				</table>
// 			</td>
// 		</tr>
// 	</table>
// 	<!-- end header -->
//
// 	<!-- big image section -->
//
// 	<table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff" class="bg_color">
//
// 		<tr>
// 			<td align="center">
// 				<table border="0" align="center" width="590" cellpadding="0" cellspacing="0"  class="container590">
//
// 					<tr>
// 						<td align="center" style="color: #343434; font-size: 24px; font-family: Quicksand, Calibri, sans-serif; font-weight:700;letter-spacing: 3px; line-height: 35px;" class="main-header">
// 							<!-- section text ======-->
//
// 							<div style="line-height: 35px">
//
// 								Welcome to Our <span style="color: #77b112;">family</span>
//
// 							</div>
// 						</td>
// 					</tr>
//
// 					<tr>
// 						<td height="10" style="font-size: 10px; line-height: 10px;">&nbsp;</td>
// 					</tr>
//
// 					<tr>
// 						<td align="center">
// 							<table border="0" width="40" align="center" cellpadding="0" cellspacing="0" bgcolor="eeeeee">
// 								<tr>
// 									<td height="2" style="font-size: 2px; line-height: 2px;">&nbsp;</td>
// 								</tr>
// 							</table>
// 						</td>
// 					</tr>
//
// 					<tr>
// 						<td height="20" style="font-size: 20px; line-height: 20px;">&nbsp;</td>
// 					</tr>
//
// 					<tr>
// 						<td align="left">
// 							<table border="0" width="590" align="center" cellpadding="0" cellspacing="0" class="container590">
// 								<tr>
// 									<td align="left" style="color: #888888; font-size: 16px; font-family: 'Work Sans', Calibri, sans-serif; line-height: 24px;">
// 										<!-- section text ======-->
//
// 										<p style="line-height: 24px; margin-bottom:15px;">
//
// Hello
// 										</p>
// 										<p style="line-height: 24px;margin-bottom:15px;">
// 											Congratulations,you are one click away from being able to invest on <span style="color:#77b112"> CowFunding.</span>
// 										</p>
// 										<p style="line-height: 24px; margin-bottom:20px;">
// 											Click the button below to verify your e-mail.
// 										</p>
// 										<table border="0" align="center" width="180" cellpadding="0" border-radius: 26px cellspacing="0" bgcolor="#77b112" style="margin-bottom:20px;">
//
// 											<tr>
// 												<td height="10" style="font-size: 10px; line-height: 10px;">&nbsp;</td>
// 											</tr>
//
// 											<tr>
// 												<td align="center" style="color: #ffffff;   font-size: 14px; font-family: 'Work Sans', Calibri, sans-serif; line-height: 22px; letter-spacing: 2px;">
// 													<!-- main section button -->
//
// 													<div style="line-height: 22px;">
// 														<a href="${process.env.APP_URL}/user/verify?email=${req.body.email}&key=${validationKey}">click here to verify
// </a>
// 													</div>
// 												</td>
// 											</tr>
//
// 											<tr>
// 												<td height="10" style="font-size: 10px; line-height: 10px;">&nbsp;</td>
// 											</tr>
//
// 										</table>
// 										<p style="line-height: 24px">
// 											Love, </br> <span style="color:#77b112"> The Cowfunding Team</span>
//
// 										</p>
//
// 									</td>
// 								</tr>
// 							</table>
// 						</td>
// 					</tr>
// 				</table>
//
//
// 		<tr>
// 			<td height="40" style="font-size: 40px; line-height: 40px;">&nbsp;</td>
// 		</tr>
//
// 	</table>
//
// 	<!-- end section -->
//
//
// 	<!-- main section -->
//
// 	<!-- end section -->
//
// 	<!-- contact section -->
// 	<table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="ffffff" class="bg_color">
//
// 		<tr>
// 			<td height="60" style="font-size: 60px; line-height: 60px;">&nbsp;</td>
// 		</tr>
//
// 		<tr>
// 			<td align="center">
// 				<table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590 bg_color">
//
// 					<tr>
// 						<td align="center">
// 							<table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590 bg_color">
//
// 								<tr>
// 									<td>
// 										<table border="0" width="300" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">
//
// 											<tr>
// 												<!-- logo -->
// 												<td align="left">
// 													<a href="" style="display: block; border-style: none !important; border: 0 !important;"><img width="80" border="0" style="display: block; width: 80px;" src="http://cowfunding.com.ng/images/logo.png" alt="" /></a>
// 												</td>
// 											</tr>
//
// 											<tr>
// 												<td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
// 											</tr>
//
// 											<tr>
// 												<td align="left" style="color: #888888; font-size: 14px; font-family: 'Work Sans', Calibri, sans-serif; line-height: 23px;" class="text_color">
// 													<div style="color: #333333; font-size: 14px; font-family: 'Work Sans', Calibri, sans-serif; font-weight: 600; mso-line-height-rule: exactly; line-height: 23px;">
//
// 														Email us: <br/> <a href="mailto:" style="color: #77b112; font-size: 14px; font-family: 'Hind Siliguri', Calibri, Sans-serif; font-weight: 400;">info@cowfunding.com.ng</a>
//
// 													</div>
// 												</td>
// 											</tr>
//
// 										</table>
//
// 										<table border="0" width="2" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">
// 											<tr>
// 												<td width="2" height="10" style="font-size: 10px; line-height: 10px;"></td>
// 											</tr>
// 										</table>
//
// 										<table border="0" width="200" align="right" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">
//
// 											<tr>
// 												<td class="hide" height="45" style="font-size: 45px; line-height: 45px;">&nbsp;</td>
// 											</tr>
//
//
//
// 											<tr>
// 												<td height="15" style="font-size: 15px; line-height: 15px;">&nbsp;</td>
// 											</tr>
//
//
//
// 										</table>
// 									</td>
// 								</tr>
// 							</table>
// 						</td>
// 					</tr>
// 				</table>
// 			</td>
// 		</tr>
//
// 		<tr>
// 			<td height="60" style="font-size: 60px; line-height: 60px;">&nbsp;</td>
// 		</tr>
//
// 	</table>
// 	<!-- end section -->
//
// 	<!-- footer ====== -->
// 	<table border="0" width="100%" cellpadding="0" cellspacing="0" bgcolor="f4f4f4">
//
// 		<tr>
// 			<td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
// 		</tr>
//
// 		<tr>
// 			<td align="center">
//
// 				<table border="0" align="center" width="590" cellpadding="0" cellspacing="0" class="container590">
//
// 					<tr>
// 						<td>
// 							<table border="0" align="left" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">
// 								<tr>
// 									<td align="left" style="color: #aaaaaa; font-size: 14px; font-family: 'Work Sans', Calibri, sans-serif; line-height: 24px;">
// 										<div style="line-height: 24px;">
//
// 											<span class="text-center" style="color: #333333;">CowFunding by Selema Farms</span>
//
// 										</div>
// 									</td>
// 								</tr>
// 							</table>
//
// 							<table border="0" align="left" width="5" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">
// 								<tr>
// 									<td height="20" width="5" style="font-size: 20px; line-height: 20px;">&nbsp;</td>
// 								</tr>
// 							</table>
//
// 							<table border="0" align="right" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="container590">
//
// 								<tr>
// 									<td>
// 										<table border="0" align="right" cellpadding="0" cellspacing="0">
// 											<tr>
// 												<td>
// 													<a href="https://www.facebook.com/selemafarmsng/?ref=bookmarks" style="display: block; border-style: none !important; border: 0 !important;"><i class="fa fa-facebook-square" style="font-size: 40px; color:#77b112 "></i></a>
// 												</td>
// 												<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
// 												<td>
// 													<a href="https://twitter.com/selema_farms" style="display: block; border-style: none !important; border: 0 !important;"><i class="fa fa-twitter-square" style="font-size: 40px; color:#77b112 "></i></a>
// 												</td>
// 												<td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
// 												<td>
// 													<a href="https://www.linkedin.com/company/selemafarms/?viewAsMember=true" style="display: block; border-style: none !important; border: 0 !important;"><i class="fa fa-linkedin-square" style="font-size: 40px; color:#77b112 "></i></a>
// 												</td>
// 											</tr>
// 										</table>
// 									</td>
// 								</tr>
//
//
// 							</table>
// 						</td>
// 					</tr>
//
// 				</table>
// 			</td>
// 		</tr>
//
// 		<tr>
// 			<td height="25" style="font-size: 25px; line-height: 25px;">&nbsp;</td>
// 		</tr>
//
// 	</table>
// 	<!-- end footer ====== -->
//
// </body>
//
// </html>
// `)
//           .send(undefined,4)
//        return res.withSuccess(200).reply();
//      }).catch((e)=>{
//       console.log(e,'error');
//       res.withServerError(500).reply();
//     })
//   }
//
//
//   static verify(req,res){
//     let query = `UPDATE users SET users.status = ?, users.reset_key = ? WHERE email = ? AND reset_key = ?`;
//     let values = [statuses.active,"null",req.body.email,req.body.validation_key];
//
//     db.query(query,values).then((result)=>{
//       if (result.affectedRows > 0){
//         res.withSuccess(200).withData({verification:'true'}).reply();
//       }else{
//         res.withClientError(400).reply();
//       }
//     }).catch(()=>{
//       res.withServerError(500).reply();
//     })
//   }
//
//   static login(req,res){
//
//     let query   = "SELECT users.*,users.id as userId,status.name as status_name,status.id as status_id FROM users INNER JOIN status ON status.id = users.status WHERE users.email = ?";
//       let values  = [req.body.email];
//       let userDet;
//
//       db.query(query, values).then((userResult)=>{
//         if (Object.keys(userResult).length > 0){
//
//           userDet = userResult[0];
//           //Check if the passwords matches
//           return passwordHelper.isSame(req.body.password,userResult[0].password)
//         }
//       }).then(function (result) {
//         console.log(result,'login result');
//         //if they match
//
//         if (result && (userDet.status === statuses.active)){
//
//           delete userDet.password;
//           delete userDet.reset_key;
//
//             //set session cookie
//           req.session.email   = userDet.email;
//           req.session.userId  = userDet.userId;
//
//           res.withSuccess(200).withData({validation:true,userDet}).reply();
//
//        }else if(result && ( userDet.status === statuses.unverified)){
//           res.withClientError(403).withErrorData(error.unverified).reply();
//
//         }else if (result && ( userDet.status === statuses.deactivate)){
//           res.withClientError(403).withErrorData(error.blocked).reply();
//
//         }else{
//           res.withClientError(404).reply()
//         }
//
//       }).catch(function (error) {
//         console.log(error);
//         res.withServerError(500).reply();
//       })
//
//   }
//
//   static validateEmail(req,res){
//     checkUser(req.query.email).then((result)=>{
//       if (Object.keys(result).length  > 0){
//         res.withSuccess(200).withData('true').reply();
//       }else{
//         res.withSuccess(200).withData('false').reply();
//       }
//     }).catch(function (e) {
//       res.withServerError(500).reply();
//     })
//   }
//
//   static passwordResetInitializer(req,res){
//
//
//     let resetKey;
//     randomKey(15).then((key)=>{
//       let query = "UPDATE users SET users.reset_key = ?  WHERE users.email = ?";
//       let values = [key,req.body.email];
//       resetKey = key;
//       return db.query(query,values);
//     }).then((result)=>{
//       if (result.affectedRows > 0){
//
//           let html = `<!DOCTYPE html>
//                       <html>
//                           <h4>Password Reset </h4><p>A password Reset was initiated on your account </p><a href=${process.env.APP_URL+"/password/reset/new/"+req.body.email+"/"+resetKey} > click here to reset your password</a></html>`
//           let mail = new mailer();
//           mail.html(html).subject("Password Reset")
//               .recipient(req.body.email).send("",3);
//         res.withSuccess(200).reply();
//
//       }else{
//         res.withClientError(400).withErrorData(error.acctNotExisting).reply()
//       }
//
//     }).catch((e)=>{
//       console.log(e)
//       res.withServerError(500).reply();
//     })
//
//
//   }
//
//   static passwordReset(req,res){
//     let hashedPassword  = passwordHelper.hash(req.body.password);
//     let query = "UPDATE users SET password = ?, users.reset_key = ? WHERE users.email = ? AND users.reset_key = ?";
//     let values = [hashedPassword,"null",req.body.email,req.body.reset_key];
//     let data;
//     return db.query(query,values).then((result)=>{
//       if (result.affectedRows > 0) {
//         data = {
//           message:"Password Reset Successful"
//         }
//         res.withSuccess(200).withData(result).reply();
//
//       }else{
//
//         res.withClientError(400).withErrorData(error.resetPass).reply();
//
//       }
//     }).catch(function (error) {
//       console.log(error);
//       res.withServerError(500).reply();
//     })
//   }
//
//
//   static getUser(req,res){
//     let query   = "SELECT users.*,status.name as status_name,status.id as status_id,banks.name as bank FROM users INNER JOIN status ON status.id = users.status LEFT JOIN banks ON banks.id = users.bank WHERE users.email = ? AND users.status = ?";
//     let values  = [req.session.email,statuses.active];
//     db.query(query, values).then((userResult)=>{
//       if (Object.keys(userResult).length > 0){
//
//         let userDet = userResult[0];
//
//         delete userDet.password;
//         delete userDet.reset_key;
//
//         res.withSuccess(200).withData(userDet).reply();
//
//       }else{
//        res.withClientError(404).reply()
//
//       }
//     }).catch(()=>{
//       res.withServerError(500).reply();
//     })
//
//   }
//
//   static  userDet(req,res){
//     let query   = "SELECT users.*,status.name as status_name,status.id as status_id FROM users INNER JOIN status ON status.id = users.status WHERE users.email = ? AND users.status = ?";
//     let values  = [req.session.email,statuses.active];
//     return db.query(query, values)
//   }
//
//   static investments(req,res){
//     let query = `SELECT farms.*,
//                  purchased_farms.date as invested_date,
//                  status.name as investment_status,
//                  (purchased_farms.quantity * farms.price_per_unit) AS invested_amount,
//                  purchased_farms.quantity AS invested_quantity
//                  FROM purchased_farms
//                  INNER JOIN farms ON farms.id = purchased_farms.farm_id
//                  INNER JOIN status ON status.id = purchased_farms.status
//                  WHERE purchased_farms.user_id = ?
//                  AND ( purchased_farms.status = ? OR purchased_farms.status = ?)
//                  `;
//     let values  = [req.session.userId,statuses.invested,statuses.reimbursed];
//     return db.query(query, values).then(function (data) {
//       if (Object.keys(data).length > 0) {
//         res.withSuccess(200).withData(data).reply();
//       }else{
//         res.withClientError(404).reply()
//       }
//     }).catch((err)=>{
//       res.withServerError(500).reply();
//     })
//   }
//   static update(req,res){
//
//     let query = `${update("users").field("name",req.body.name).field("bank",req.body.bank).field("bank_acct_name",req.body.bank_acct_name).field("bank_acct_number",req.body.bank_acct_number).field("phone_number",req.body.phone_number).field("address",req.body.address).field("password",req.body.password?passwordHelper.hash(req.body.password):null).done()} WHERE id = ? AND status = ?`;
//     let values  = [req.session.userId,statuses.active];
//
//     return db.query(query, values).then(function (data) {
//         res.withSuccess(200).reply();
//     }).catch((err)=>{
//       res.withServerError(500).reply();
//     })
//   }
//
//   static createAdmin(req,res){
//     checkUser(req.query.email).then((result)=>{
//       if (Object.keys(result).length  === 0){
//         let query   = "INSERT INTO users (name,email,password,user_type,status) VALUES (?,?,?,?,?)";
//         let slug    = slugger(userType.admin);
//         let password = passwordHelper.hash(slug);
//         let mail = new mailer();
//         mail.html(`<!DOCTYPE html><html><h4>Account Creation</h4><p>An admin account has been created with this details:</p><p><b>Email:</b>${req.body.email}</p><p><b>Password:</b>${slug}</p><a href=${process.env.APP_URL} >click here to login</a></html>`).subject("New Account Creation").recipient(req.body.email).send("",3);
//         let values  = [req.body.name,req.body.email,password,req.body.user_type,statuses.active];
//         return db.query(query,values);
//       }
//     }).then((result)=>{
//       res.withSuccess(201).reply();
//     }).catch(function (e) {
//       console.log(e)
//       res.withServerError(500).reply();
//     })
//   }
//
//   static all(req,res){
//     let values  = [];
//     let query   = `SELECT users.*,status.name as user_status_name,user_types.name as user_type_name FROM users
//                  INNER JOIN status ON status.id = users.status
//                  INNER JOIN user_types ON user_types.id = users.user_type
//                  `
//     return db.query(query,values).then( (response)=> {
//       let data = {};
//       data.users = response
//       res.withSuccess(200).withData(data).reply();
//
//     }).catch( (err)=> {
//       res.withServerError(500).reply();
//     })
//   }
//
//   static  status(req,res){
//     let status;
//     switch (req.params.userStatus) {
//       case 'activate':
//         status = 1;
//         break;
//       case 'de-activate':
//         status = 2;
//         break;
//     }
//     if (status){
//
//       let query = "UPDATE users SET status = ? WHERE id = ?";
//       let values = [status,req.params.userId];
//       return db.query(query,values).then((result)=>{
//         res.withSuccess(200).withData(result).reply();
//       }).catch(function (error) {
//         res.withServerError(500).reply();
//       })
//     } else{
//
//       res.withClientError(400).reply();
//     }
//   }
//
//   static types(req,res){
//     let query   = "SELECT * FROM user_types";
//     let values  = [];
//     return db.query(query, values).then( (result)=> {
//       res.withSuccess(200).withData(result).reply();
//     }).catch( ()=> {
//       res.withServerError(500).reply();
//     })
//   }
//
//   static logout(req,res){
//     req.session.destroy(function (err) {
//       if (err){
//         res.withServerError(500).reply();
//       }else{
//         res.withSuccess(200).reply();
//       }
//     })
//   }
//
//   static summary(req,res){
//     let farms,users,activeFarms,soldOutFarms;
//     let values = [];
//     let query = "SELECT id FROM farms";
//     return db.query(query,values).then(function (data) {
//       farms = data.length;
//       let query = `SELECT id FROM farms WHERE status = ?`;
//       let values = [statuses.active];
//       return db.query(query,values)
//     }).then((data)=>{
//       activeFarms = data.length;
//       let query = "SELECT id FROM users";
//       let values = [];
//       return db.query(query,values);
//     }).then((data)=>{
//       users = data.length;
//       let query = "SELECT id FROM farms WHERE status = ?";
//       let values = [statuses.soldout];
//       return db.query(query,values);
//     }).then((data)=>{
//       soldOutFarms = data.length;
//       let result = {
//         active_farms:activeFarms,
//         users: users,
//         soldout_farms:soldOutFarms,
//         farms:farms
//       };
//       res.withSuccess(200).withData(result).reply();
//     }).catch(function (reason) {
//       console.log(reason);
//       res.withServerError(500).reply();
//     })
//
//   }
//
//   static investorSummary(req,res){
//     let summary = {}
//     let query = `SELECT count(purchased_farms.id) as opened_investments
//                  FROM purchased_farms
//                  INNER JOIN farms on farms.id = purchased_farms.farm_id
//                  INNER JOIN status on status.id = purchased_farms.status
//                  WHERE purchased_farms.user_id = ?
//                  AND purchased_farms.status = ?
//                  `;
//
//     let values = [req.session.userId,statuses.invested];
//
//     db.query(query,values).then( (data)=> {
//
//       Object.assign(summary,data[0])
//
//       let query = `SELECT purchased_farms.date as next_due_date, SUM ((((farms.roi/100 )*farms.price_per_unit) + farms.price_per_unit) * purchased_farms.quantity) as next_due_payment
//                    FROM purchased_farms
//                    INNER JOIN farms on farms.id = purchased_farms.farm_id
//                    INNER JOIN status on status.id = purchased_farms.status
//                    WHERE purchased_farms.user_id = ?
//                    AND purchased_farms.date = (
//                     SELECT MIN(purchased_farms.date) FROM purchased_farms
//                     WHERE purchased_farms.status = ?
//                    )
//                    GROUP BY purchased_farms.date
//
//                  `;
//
//       let values = [req.session.userId,statuses.invested];
//
//       return db.query(query,values)
//
//     }).then((data)=>{
//
//       Object.assign(summary,data[0]);
//
//       let query = `SELECT count(farms.id) as followed_farms
//                    FROM farms
//                    INNER JOIN followed_farms on farms.id = followed_farms.farm_id
//                    WHERE followed_farms.user_id = ?
//
//                  `;
//
//       let values = [req.session.userId,];
//       return db.query(query,values)
//     }).then((data)=>{
//       Object.assign(summary,data[0]);
//       res.withSuccess(200).withData(summary).reply();
//     }).catch((error)=>{
//       console.log(error);
//       res.withServerError(500).reply();
//     })
//   }
//
//   static  getInvoiceSummary(req,res){
//
//     let query = `SELECT purchased_farms.*,users.name as investor_name,farms.price_per_unit FROM purchased_farms
//                   INNER JOIN users ON users.id = purchased_farms.user_id
//                   INNER JOIN farms on farms.id = purchased_farms.farm_id
//                   WHERE purchased_farms.slug = ?
//                  `;
//
//     let values = [req.params.slugId];
//
//     return db.query(query,values).then((result)=>{
//       res.withSuccess(200).withData(result[0]).reply();
//     }).catch(()=>{
//       res.withServerError(500).reply();
//     })
//   }
//
// }
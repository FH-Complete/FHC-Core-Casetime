/**
 * TODO: to be moved to language switcher widget
 */
function setUserLanguage(language)
{
	FHC_AjaxClient.ajaxCallPost(
		"widgets/Language/setSessionLanguage",
		{
			language: language
		},
		{
			successCallback: function(response, textStatus, jqXHR) {

				if (FHC_AjaxClient.isError(response))
				{
					FHC_DialogLib.alertError(FHC_AjaxClient.getError(response));
				}
				else
				{
					location.reload(); // reload the page
				}
			},
			errorCallback: function(jqXHR, textStatus, errorThrown) {
				FHC_DialogLib.alertError("Something terribly wrong just happened! Call a super hero!!");
			}
		}
	);
}

/**
 *
 */
function activateAccountClick()
{
 	FHC_AjaxClient.ajaxCallPost(
 		"extensions/FHC-Core-FHTW/cis/AccountActivation/activate",
 		{
			username: $("#username").val(),
			code: $("#code").val(),
 			newPassword: $("#newPassword").val(),
 			repeatPassword: $("#repeatPassword").val(),
			captchaCode: $("#captchaCode").val()
 		},
 		{
 			successCallback: function(response, textStatus, jqXHR) {

				if (FHC_AjaxClient.isError(response))
				{
					FHC_DialogLib.alertError(FHC_AjaxClient.getError(response));

					document.getElementById("captcha").src = FHC_JS_DATA_STORAGE_OBJECT.app_root + "vendor/dapphp/securimage/securimage_show.php?" + Math.random();

					$("#captchaCode").val("");
				}
				else
				{
					var responseData = FHC_AjaxClient.getData(response);

					FHC_DialogLib.alertSuccess(responseData.message);

					setTimeout(
						function() {
							window.location = responseData.cisroot;
						},
						3000
					);
				}
 			},
			errorCallback: function(jqXHR, textStatus, errorThrown) {
				FHC_DialogLib.alertError("Something terribly wrong just happened! Call a super hero!!");
			}
 		}
 	);
}

/**
 *
 */
function setEvents()
{
	$("#activateAccount").click(activateAccountClick);
}

/**
 * When JQuery is up
 */
$(document).ready(function() {

	setEvents();

});

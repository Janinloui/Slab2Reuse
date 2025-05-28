package auth.controllers;

import auth.external.services.WSO2Service;
import dk.bm.fido.auth.services.FrontEndService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class FidoController {
    private final WSO2Service wso2Service;
    private final FrontEndService frontEndService;

    public FidoController(WSO2Service wso2Service, FrontEndService frontEndService) {
        this.wso2Service = wso2Service;
        this.frontEndService = frontEndService;
    }

    /**
     * Function for retrieving the users FIDO2 devices and returning them with the html page
     * @param model container for attributes between backend and frontend
     * @param authentication the authentication class provided by Spring
     * @return the FIDO2 devices list html, with the FIDO2 devices added to the model
     */
    @GetMapping("fidoDevices")
    public String fidoDevices(
            Model model,
            Authentication authentication
    ) {
        String token = frontEndService.getAccessToken(authentication);

        model.addAttribute(
                "devices" ,
                wso2Service.getUserDevices(token)
        );

        FrontEndService.setAuthenticated(authentication, model);

        return "fidoDevices";
    }

    /**
     * Function used to delete a FIDO2 device/login from the users account
     * @param credential the id of the FIDO2 credential to be deleted
     * @param authentication the authentication class provided by Spring
     * @return redirect to the fidoDevices html page
     */
    @PostMapping(value="fidoDevices/deleteDevice/{credential}") //Delete not supported by forms
    public String deleteFidoDevice(
            @PathVariable String credential,
            Authentication authentication
    ) {
        String token = frontEndService.getAccessToken(authentication);

        wso2Service.deleteDeviceCredential(token, credential);
        return "redirect:/fidoDevices";
    }

    /**
     * Mapping for updating the name of the FIDO2 device
     * @param credential the id of the FIDO2 credential to be updated
     * @param newName the new name of the device
     * @param authentication the authentication class provided by Spring
     * @return redirect to the fidoDevices html page
     */
    @PostMapping("fidoDevices/editDevice/{credential}/{newName}")
    public String editFidoDevice(
            @PathVariable String credential,
            @PathVariable String newName,
            Authentication authentication
    ) {
        String token = frontEndService.getAccessToken(authentication);

        wso2Service.editDeviceName(token, credential, newName);
        return "redirect:/fidoDevices";
    }
}

package drocck.sp.beesandhoney.web.controllers;

import drocck.sp.beesandhoney.business.entities.Location;
import drocck.sp.beesandhoney.business.services.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Chai
 *         Created on 10/9/2015.
 */
@Controller
@RequestMapping("location")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @ModelAttribute("location")
    public Location construct() {
        return new Location();
    }

    @ModelAttribute("allLocations")
    public @ResponseBody
    List<Location> populateLocations(){
        return locationService.findAll();
    }

    @RequestMapping(value = "/create", method = RequestMethod.GET)
    public String create() {
        return "location/create";
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public String create(@ModelAttribute("location") Location location) {
        locationService.save(location);
        return "redirect:list";
    }

    @RequestMapping(value = "/read/{id}", method = RequestMethod.GET)
    public String read(@PathVariable Long id, Model model) {
        model.addAttribute("location", locationService.findOne(id));
        return "location/read";
    }

    @RequestMapping(value = "/update/{id}", method = RequestMethod.GET)
    public String update(@PathVariable Long id, Model model) {
        model.addAttribute("location", locationService.findOne(id));
        return "location/update";
    }

    @RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
    public String update(@PathVariable Long id, Location location) {
        locationService.update(location);
        return "redirect:list";
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.GET)
    public String delete(@PathVariable Long id, Model model) {
        model.addAttribute("location", locationService.findOne(id));
        return "location/delete";
    }

    @RequestMapping("/confirmedDelete/{id}")
    public String confirmedDelete(@PathVariable Long id) {
        locationService.delete(id);
        return "redirect:list";
    }

    @RequestMapping(value ="/list",  method = RequestMethod.GET)
    public String list() {
        return "location/list";
    }
}
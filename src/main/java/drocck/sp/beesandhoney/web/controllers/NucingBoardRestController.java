package drocck.sp.beesandhoney.web.controllers;import drocck.sp.beesandhoney.business.entities.*;import drocck.sp.beesandhoney.business.entities.DTOs.NucReportDTO;import drocck.sp.beesandhoney.business.entities.DTOs.NucReportSumDTO;import drocck.sp.beesandhoney.business.entities.DTOs.YardCreateDTO;import drocck.sp.beesandhoney.business.entities.DTOs.YardEditMultipleDTO;import drocck.sp.beesandhoney.business.services.*;import org.springframework.beans.factory.annotation.Autowired;import org.springframework.web.bind.annotation.*;import javax.persistence.PersistenceException;import javax.servlet.http.HttpServletResponse;import java.sql.Date;import java.text.ParseException;import java.text.SimpleDateFormat;import java.util.*;/** * Created by Connor on 3/12/2016. */@RestControllerpublic class NucingBoardRestController {    @Autowired    private AddressService addressService;    @Autowired    private RegionService regionService;    @Autowired    private PersonService personService;    @Autowired    private OwnerService ownerService;    @Autowired    private NucReportService nucReportService;    @Autowired    private NucYardService nucYardService;    @Autowired    private EventService eventService;    @RequestMapping(value = "nucing/createNucYard")    public YardCreateDTO createYard() {        YardCreateDTO ycdto = new YardCreateDTO();        ycdto.setStati(Yard.getStati());        ycdto.setPeople(personService.findAll());        ycdto.setRegions(regionService.findAllRegionNames());        return ycdto;    }    @RequestMapping(value = "nucing/editNucYard")    public YardEditMultipleDTO editYard() {        YardEditMultipleDTO yedto = new YardEditMultipleDTO();        yedto.setYards(nucYardService.findAll());        yedto.setStati(Yard.getStati());        yedto.setPeople(personService.findAll());        yedto.setRegions(regionService.findAllRegionNames());        return yedto;    }    @RequestMapping(value = "nucing/reports", method = RequestMethod.GET)    public List<NucReportDTO> listReports() {        List<NucReportDTO> dtoList = new ArrayList<>();        List<NucYard> yardList = nucYardService.findAllInUse();        for (NucYard n : yardList) {            NucReport report = nucReportService.findOneByYardAndYear(n, Calendar.getInstance().get(Calendar.YEAR));            if (report == null) {                NucReportDTO temp = new NucReportDTO();                temp.setYardName(n.getYardName());                temp.setYardId(n.getId());                dtoList.add(temp);            } else {                dtoList.add(new NucReportDTO(report));            }        }        return dtoList;    }    @RequestMapping(value = "nucing/reportSum", method = RequestMethod.GET)    public NucReportSumDTO sumReports() {        List<NucYard> yardList = nucYardService.findAll();        NucReportSumDTO sum = new NucReportSumDTO();        for (NucYard n : yardList) {            NucReport report = nucReportService.findOneByYardAndYear(n, Calendar.getInstance().get(Calendar.YEAR));            if (report != null) {                sum.setInitialCount(sum.getInitialCount() + report.getInitialCount());                sum.setCountDuringSupering(sum.getCountDuringSupering() + report.getCountDuringSupering());                sum.setSuperCount(sum.getSuperCount() + report.getSuperCount());                sum.setOldQueensCount(sum.getOldQueensCount() + report.getOldQueensCount());                sum.setNucCount(sum.getNucCount() + report.getNucCount());                sum.setQueensPlaced(sum.getQueensPlaced() + report.getQueensPlaced());                sum.setFinalCount(sum.getFinalCount() + report.getFinalCount());            }        }        return sum;    }    @RequestMapping(value = "nucing/nucReport/{id}", method = RequestMethod.GET)    public NucReport report(@PathVariable("id") Long id) {        NucReport nucReport;        nucReport = nucReportService.findOneByYardAndYear(nucYardService.findOne(id), Calendar.getInstance().get(Calendar.YEAR));        if (nucReport == null) {            nucReport = new NucReport();        }        return nucReport;    }    @RequestMapping(value = "nucing/getYard/{id}", method = RequestMethod.GET)    public NucYard getNucYard(@PathVariable long id) {        NucYard rv;        rv = nucYardService.findOne(id);        return rv;    }    @RequestMapping(value = "nucing/update/nucYard/{yardTimeStamp}", method = RequestMethod.POST)    public void addNucYard(@RequestBody String nucYard, @PathVariable(value = "yardTimeStamp") String timestamp, final HttpServletResponse response) {        response.setHeader("Cache-Control", "no-cache");        response.setHeader("pragma", "no-cache");        Map<String, String> keyValMap = parseString(nucYard);        NucYard y = null;        try {            y = nucYardService.findOne(Long.parseLong(keyValMap.get("yardName"))); //(keyValMap.get("yardName"));        } catch (NumberFormatException nfe) {            System.out.println(nfe.getMessage());        }        Address a;        Owner o;        if (y == null) {            y = new NucYard();            a = new Address();            o = ownerService.findOneByPerson(personService.findOneByName(keyValMap.get("owner")));            y.setYardName(keyValMap.get("yardName"));        } else {            a = y.getAddress();            o = y.getOwner();        }        if (o == null) {            o = new Owner();            o.setPerson(personService.findOneByName(keyValMap.get("owner")));        }        if (!Objects.equals(keyValMap.get("maxHives"), "")) {            y.setMaxHives(Integer.parseInt(keyValMap.get("maxHives")));        } else {            y.setMaxHives(0);        }        y.setStatus(keyValMap.get("status"));        y.setOwner(o);        y.setRentReceiver(personService.findOneByName(keyValMap.get("rentReceiver")));        y.setLongitude(Double.parseDouble(keyValMap.get("longitude")));        y.setLatitude(Double.parseDouble(keyValMap.get("latitude")));        y.setCombo(keyValMap.get("combo"));        y.setRegion(regionService.findByName(keyValMap.get("region")));        a.setStreet(keyValMap.get("street"));        a.setApt(keyValMap.get("apt"));        a.setCity(keyValMap.get("city"));        a.setState(keyValMap.get("state"));        a.setZip(keyValMap.get("zip"));        y.setAddress(a);        if (o.getYards() == null) {            ArrayList<Yard> list = new ArrayList();            list.add(y);            o.setYards(list);        } else if (!o.getYards().contains(y)) {            o.getYards().add(y);        }        System.out.println(nucYard);        try {            nucYardService.save(y);        } catch (PersistenceException pe) {            pe.getCause();        }    }    @RequestMapping(value = "nucing/update/nucReport/{reportTimestamp}", method = RequestMethod.POST)    public void addNucReport(@RequestBody String nucReport, @PathVariable(value = "reportTimestamp") String timestamp, final HttpServletResponse response) {        Map<String, String> reportMap = parseString(nucReport);        NucYard y = nucYardService.findOne(Long.parseLong(reportMap.get("yardId")));        NucReport report = nucReportService.findOneByYard(y);        int initialCount = 0;        int countDuringSupering = 0;        int nucCount = 0;        int oldQueensCount = 0;        int finalCount = 0;        try {            initialCount = Integer.parseInt(reportMap.get("initialCount"));        } catch (NumberFormatException nfe) {            System.err.println("Initial Count NFE: " + nfe.getMessage());            nfe.printStackTrace();        }        try {            countDuringSupering = Integer.parseInt(reportMap.get("countDuringSupering"));        } catch (NumberFormatException nfe) {            System.err.println("Count @ Supering NFE: " + nfe.getMessage());            nfe.printStackTrace();        }        try {            nucCount = Integer.parseInt(reportMap.get("nucCount"));        } catch (NumberFormatException nfe) {            System.err.println("Nuc Count NFE: " + nfe.getMessage());            nfe.printStackTrace();        }        try {            oldQueensCount = Integer.parseInt(reportMap.get("oldQueensCount"));        } catch (NumberFormatException nfe) {            System.err.println("Old Queen NFE: " + nfe.getMessage());            nfe.printStackTrace();        }        try {            finalCount = Integer.parseInt(reportMap.get("finalCount"));        } catch (NumberFormatException nfe) {            System.err.println("Final Count NFE: " + nfe.getMessage());            nfe.printStackTrace();        }        response.setHeader("Cache-Control", "no-cache");        response.setHeader("pragma", "no-cache");        System.out.println(nucReport);        if (report == null) {            report = new NucReport();            report.setYard(y);            report.setYear(Calendar.getInstance().get(Calendar.YEAR));        }        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");        java.util.Date lDate = null;        java.util.Date pDate = null;        java.util.Date sDate = null;        java.util.Date splitDate = null;        java.util.Date fedDate = null;        java.util.Date queenPlaced = null;        try {            lDate = sdf.parse(reportMap.get("dateLaidOut"));        } catch (ParseException pe) {//            System.err.println(pe.getMessage());        }        try {            pDate = sdf.parse(reportMap.get("dateBeesPlaced"));        } catch (ParseException pe) {//            System.err.println(pe.getMessage());        }        try {            sDate = sdf.parse(reportMap.get("dateBeesSupered"));        } catch (ParseException pe) {//            System.err.println(pe.getMessage());        }        try {            splitDate = sdf.parse(reportMap.get("dateBeesSplit"));        } catch (ParseException pe) {//            System.err.println(pe.getMessage());        }        try {            fedDate = sdf.parse(reportMap.get("dateFed"));        } catch (ParseException pe) {            //        }        try {            queenPlaced = sdf.parse(reportMap.get("dateBeesQueened"));        } catch (ParseException pe) {            //        }        if (lDate != null) {            report.setDateLaidOut(new Date(lDate.getTime()));        }        if (pDate != null) {            report.setDateBeesPlaced(new Date(pDate.getTime()));        }        report.setInitialCount(initialCount);        if (sDate != null) {            report.setDateBeesSupered(new Date(sDate.getTime()));        }        report.setSuperCount(Integer.parseInt(reportMap.get("superCount")));        if (splitDate != null) {            if (report.getDateBeesSplit() == null) {                Event split = new Event();                split.setDate(new Date(splitDate.getTime()));                split.setTitle("Splits @ " + report.getYard().getYardName());                Event place = new Event();                place.setDate(new Date(splitDate.getTime() + (1000 * 60 * 60 * 24 * 3)));                place.setTitle("Place @ " + report.getYard().getYardName());                Event check = new Event();                check.setDate(new Date(splitDate.getTime() + (1000 * 60 * 60 * 24 * 24)));                check.setTitle("Check @ " + report.getYard().getYardName());                eventService.save(split);                eventService.save(place);                eventService.save(check);            }            report.setDateBeesSplit(new Date(splitDate.getTime()));        }        if (fedDate != null) {            report.setDateFed(new Date(fedDate.getTime()));        }        if (queenPlaced != null) {            report.setDateBeesQueened(new Date(queenPlaced.getTime()));        }        report.setCountDuringSupering(countDuringSupering);        report.setOldQueensCount(oldQueensCount);        report.setNucCount(nucCount);        report.setQueensPlaced(Integer.parseInt(reportMap.get("queensPlaced")));        report.setFinalCount(finalCount);        nucReportService.save(report);        if (finalCount != 0) {            y.setCurrentHives(finalCount, 0);        } else if (nucCount != 0) {            y.setCurrentHives(nucCount + oldQueensCount, 0);        } else if (countDuringSupering != 0) {            y.setCurrentHives(0, countDuringSupering);        } else if (initialCount != 0) {            y.setCurrentHives(0, initialCount);        }        nucYardService.save(y);    }//    @RequestMapping(value = "nucing/test", method = RequestMethod.POST)//    public @ResponseBody//    NucingTask test(@RequestBody final String event) {//        Map<String, String> m = parseString(event);////        int count = Integer.parseInt(m.get("count"));//        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");//        Date d = new java.sql.Date(0);//        try {//            java.util.Date day = sdf.parse(m.get("start"));//            d.setTime(day.getTime());//        } catch (ParseException pe) {//            System.err.println("Parsing Date Failed " + pe.getMessage());//        }////        NucingTask task = new NucingTask(count, d);////        return task;//    }    private Map<String, String> parseString(String s) {        Map<String, String> m = new HashMap<>();        String key = "";        String value = "";        s += '&';        boolean writeToKey = true;        int i = 0;        while (i < s.length()) {            switch (s.charAt(i)) {                case '%':                    i++;                    String hex = s.substring(i, (i + 2));                    i++;                    if (writeToKey) {                        key += (char) (Integer.parseInt(hex, 16));                    } else {                        value += (char) (Integer.parseInt(hex, 16));                    }                    break;                case '+':                    if (writeToKey) {                        key += " ";                    } else {                        value += " ";                    }                    break;                // end of key start of value                case '=':                    writeToKey = false;                    break;                // end of value start of new entry                case '&':                    m.put(key, value);                    writeToKey = true;                    // clear key and value                    key = "";                    value = "";                    break;                default:                    if (writeToKey) {                        key += s.charAt(i);                    } else {                        value += s.charAt(i);                    }                    break;            }            i++;        }        return m;    }}
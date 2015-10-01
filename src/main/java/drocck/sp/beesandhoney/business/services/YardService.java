package drocck.sp.beesandhoney.business.services;

import drocck.sp.beesandhoney.business.entities.Yard;
import drocck.sp.beesandhoney.business.entities.repositories.YardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Connor on 9/26/2015.
 */
@Service
public class YardService {

    @Autowired
    YardRepository yardRepository;

    public YardService() {
        super();
    }

    public List<Yard> findAll() {
        return this.yardRepository.findAll();
    }

    public Yard findById(Long id) {
        Yard person = yardRepository.findById(id);
        return person;
    }

    public Yard save(final Yard yard) {
        return this.yardRepository.save(yard);
    }
}

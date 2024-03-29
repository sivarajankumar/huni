package au.net.huni.model;

import static au.net.huni.json.Transformer.CALENDAR_TRANSFORMER;
import static au.net.huni.json.Transformer.INSTITUTION_OBJECT_FACTORY;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.apache.commons.lang3.RandomStringUtils;
import org.hibernate.proxy.HibernateProxyHelper;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.roo.addon.javabean.RooJavaBean;
import org.springframework.roo.addon.jpa.activerecord.RooJpaActiveRecord;
import org.springframework.roo.addon.json.RooJson;
import org.springframework.roo.addon.tostring.RooToString;
import org.springframework.roo.addon.web.mvc.controller.json.RooWebJson;

import flexjson.JSONDeserializer;
import flexjson.JSONSerializer;

@RooJavaBean
@RooToString
@RooJson
// TODO RR is this right?
@RooWebJson(jsonObject = Institution.class)
@RooJpaActiveRecord(finders = { "findRegistrationsByUserNameEquals" })
public class Registration {

    @NotNull
    @Column(unique = true)
    @Size(min = 5, max = 10)
    private String userName = RandomStringUtils.random(10);

    @NotNull
    @Size(min = 1, max = 60)
    private String givenName;

    @NotNull
    @Size(min = 1, max = 60)
    private String familyName;

    @NotNull
    @Pattern(regexp = "^([0-9a-zA-Z]([-.\\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\\w]*[0-9a-zA-Z]\\.)+[a-zA-Z]{2,9})$")
    private String emailAddress;

    @NotNull
    @ManyToOne
    private Institution institution;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(style = "S-")
    private Calendar applicationDate = Calendar.getInstance();

    @Temporal(TemporalType.TIMESTAMP)
    @DateTimeFormat(style = "S-")
    private Calendar approvalDate;

    @NotNull
    @Enumerated
    private RegistrationStatus status;

    public static au.net.huni.model.Registration fromJsonToRegistration(String json) {
        return new JSONDeserializer<Registration>().use(null, Registration.class).use("institution", INSTITUTION_OBJECT_FACTORY).deserialize(json);
    }

    public static Collection<au.net.huni.model.Registration> fromJsonArrayToRegistrations(String json) {
        return new JSONDeserializer<List<Registration>>().use(null, ArrayList.class).use("values", Registration.class).use("institution", INSTITUTION_OBJECT_FACTORY).deserialize(json);
    }

    public static String toJsonArray(Collection<au.net.huni.model.Registration> collection) {
        return new JSONSerializer().exclude("*.class").transform(CALENDAR_TRANSFORMER, Calendar.class).serialize(collection);
    }

    public String toJson() {
        return new JSONSerializer().exclude("*.class").transform(CALENDAR_TRANSFORMER, Calendar.class).serialize(this);
    }
    
    @Override
    public boolean equals(final Object obj) {
        if (this == obj) {
            return true;
        } else if (!(HibernateProxyHelper.getClassWithoutInitializingProxy(obj).equals(Registration.class))) {
            return false;
        }

        Registration candidate = (Registration) obj;

        return this.getUserName().equals(candidate.getUserName())
                && this.getApplicationDate().equals(candidate.getApplicationDate())
            ;
    }
    
    @Override
    public int hashCode() {
        return this.getUserName().hashCode()
                + this.getApplicationDate().hashCode() * 37
             ;
    }
    
    public String toString() {
        StringBuilder buffer = new StringBuilder();
        buffer.append(this.getFamilyName());
        buffer.append(", ");
        buffer.append(getGivenName());
        buffer.append(" (");
        buffer.append(getUserName());
        buffer.append(")");
        return buffer.toString();
    }
}

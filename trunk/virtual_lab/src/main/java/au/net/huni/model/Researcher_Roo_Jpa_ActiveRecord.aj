// WARNING: DO NOT EDIT THIS FILE. THIS FILE IS MANAGED BY SPRING ROO.
// You may push code into the target .java compilation unit if you wish to edit any member(s).

package au.net.huni.model;

import au.net.huni.model.Researcher;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.springframework.transaction.annotation.Transactional;

privileged aspect Researcher_Roo_Jpa_ActiveRecord {
    
    @PersistenceContext
    transient EntityManager Researcher.entityManager;
    
    public static final EntityManager Researcher.entityManager() {
        EntityManager em = new Researcher().entityManager;
        if (em == null) throw new IllegalStateException("Entity manager has not been injected (is the Spring Aspects JAR configured as an AJC/AJDT aspects library?)");
        return em;
    }
    
    public static long Researcher.countResearchers() {
        return entityManager().createQuery("SELECT COUNT(o) FROM Researcher o", Long.class).getSingleResult();
    }
    
    public static List<Researcher> Researcher.findAllResearchers() {
        return entityManager().createQuery("SELECT o FROM Researcher o", Researcher.class).getResultList();
    }
    
    public static Researcher Researcher.findResearcher(Long id) {
        if (id == null) return null;
        return entityManager().find(Researcher.class, id);
    }
    
    public static List<Researcher> Researcher.findResearcherEntries(int firstResult, int maxResults) {
        return entityManager().createQuery("SELECT o FROM Researcher o", Researcher.class).setFirstResult(firstResult).setMaxResults(maxResults).getResultList();
    }
    
    @Transactional
    public void Researcher.persist() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.persist(this);
    }
    
    @Transactional
    public void Researcher.remove() {
        if (this.entityManager == null) this.entityManager = entityManager();
        if (this.entityManager.contains(this)) {
            this.entityManager.remove(this);
        } else {
            Researcher attached = Researcher.findResearcher(this.id);
            this.entityManager.remove(attached);
        }
    }
    
    @Transactional
    public void Researcher.flush() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.flush();
    }
    
    @Transactional
    public void Researcher.clear() {
        if (this.entityManager == null) this.entityManager = entityManager();
        this.entityManager.clear();
    }
    
    @Transactional
    public Researcher Researcher.merge() {
        if (this.entityManager == null) this.entityManager = entityManager();
        Researcher merged = this.entityManager.merge(this);
        this.entityManager.flush();
        return merged;
    }
    
}
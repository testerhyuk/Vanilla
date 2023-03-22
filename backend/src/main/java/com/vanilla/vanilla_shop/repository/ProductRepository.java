package com.vanilla.vanilla_shop.repository;

import com.vanilla.vanilla_shop.entity.Product;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class ProductRepository{
    @PersistenceContext
    private EntityManager em;

    public List<Product> findTopTen() {
        return em.createQuery("select p from Product p", Product.class)
                .setMaxResults(10)
                .getResultList();
    }

    public List<Product> findProdByKeyword(String keyword) {
        return em.createQuery(
                "select p from Product p where title like :keyword"
                , Product.class
                ).setParameter("keyword", "%"+keyword+"%")
                .getResultList();
    }

    public List<Product> findProductByCat(String sex, String cat) {
        return em.createQuery(
                "select p from Product p where p.sex='" + sex + "' and p.category='" + cat + "'",
                Product.class
        ).getResultList();
    }
}

package com.loja.calcados.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "produtos")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Double preco;
    private String imagemUrl;
    private String nome;
    @Column(length = 10000)
    private String descricao;
    private String categoriaFaixaEtaria;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "produto_id")
    private List<ProdutoVariacao> variacoes = new ArrayList<>();

    public Produto() {
    }

    public Produto(String nome, String descricao, String categoriaFaixaEtaria) {
        this.nome = nome;
        this.descricao = descricao;
        this.categoriaFaixaEtaria = categoriaFaixaEtaria;
    }

    // Método para adicionar um novo tamanho/cor a este produto
    public void adicionarVariacao(ProdutoVariacao variacao) {
        this.variacoes.add(variacao);
    }

    // Método de negócio: Pegar todas as cores disponíveis
    public List<String> getCoresDisponiveis() {
        List<String> cores = new ArrayList<>();
        for (ProdutoVariacao v : variacoes) {
            if (!cores.contains(v.getCor()) && v.isDisponivel()) {
                cores.add(v.getCor());
            }
        }
        return cores;
    }

    public Long getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public String getCategoriaFaixaEtaria() {
        return categoriaFaixaEtaria;
    }

    public List<ProdutoVariacao> getVariacoes() {
        return variacoes;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public String getImagemUrl() {
        return imagemUrl;
    }

    public void setImagemUrl(String imagemUrl) {
        this.imagemUrl = imagemUrl;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setCategoriaFaixaEtaria(String categoriaFaixaEtaria) {
        this.categoriaFaixaEtaria = categoriaFaixaEtaria;
    }

    public void setVariacoes(List<ProdutoVariacao> variacoes) {
        this.variacoes = variacoes;
    }
}
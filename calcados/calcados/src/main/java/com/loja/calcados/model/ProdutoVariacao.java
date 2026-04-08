package com.loja.calcados.model;

import jakarta.persistence.*;

@Entity
@Table(name = "produto_variacoes")
public class ProdutoVariacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "produto_id", insertable = false, updatable = false)
    private Produto produto;
    private String cor;
    private int tamanho;
    private double preco;
    private int quantidadeEstoque;

    public ProdutoVariacao() {
    }

    public ProdutoVariacao(String cor, int tamanho, double preco, int quantidadeEstoque) {
        this.cor = cor;
        this.tamanho = tamanho;
        this.preco = preco;
        this.quantidadeEstoque = quantidadeEstoque;
    }

    public boolean isDisponivel() {
        return this.quantidadeEstoque > 0;
    }

    public void baixarEstoque(int quantidadeComprada) {
        if (quantidadeComprada <= this.quantidadeEstoque) {
            this.quantidadeEstoque -= quantidadeComprada;
        } else {
            throw new IllegalArgumentException("Estoque insuficiente para esta numeração.");
        }
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    public void setTamanho(int tamanho) {
        this.tamanho = tamanho;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }

    public void setQuantidadeEstoque(int quantidadeEstoque) {
        this.quantidadeEstoque = quantidadeEstoque;
    }

    public Long getId() {
        return id;
    }

    public int getTamanho() {
        return tamanho;
    }

    public String getCor() {
        return cor;
    }

    public double getPreco() {
        return preco;
    }

    public int getQuantidadeEstoque() {
        return quantidadeEstoque;
    }
}
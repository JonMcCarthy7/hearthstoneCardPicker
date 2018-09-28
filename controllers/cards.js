const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION
  index: function(req, res) {
    if (!req.session.deck) {
      req.session.deck = [];
    }
    knex("cards").then(cards => {
      res.render("index", { cards, deck: req.session.deck });
    });
  },

  create: function(req, res) {
    knex("cards")
      .insert({
        mana: req.body.mana,
        health: req.body.health,
        attack: req.body.attack,
        description: req.body.description
      })
      .then(() => {
        res.redirect("/");
      });
  },

  add: (req, res) => {
    knex("cards")
      .where("id", req.params.id)
      .then(result => {
        req.session.deck.push(result[0]);
        res.redirect("/");
      });
  },

  remove: (req, res) => {
    if (req.session.deck.length == 1) {
      req.session.deck = [];
    }
    req.session.deck = req.session.deck.filter(
      card => card.id !== Number(req.params.id)
    );
    res.redirect("/");
  }
};

import {Component, OnInit} from '@angular/core';
import * as jQuery from 'jquery';
import {AuthenticationService} from '../authentication/authentication.service';
import {Router} from '@angular/router';
import {PanierService} from '../panier/panier.service';
import {DetailPanier} from '../detailPanier/detailPanier';
import {FamilleGlobalService} from '../famillesGlobal/familleGlobal.service';
import {FamilleGlobal} from '../famillesGlobal/familleGlobal';
import {Famille} from '../familles/famille';
import {ProduitService} from '../produits/produit.service';
import {Produit} from '../produits/produit';
import {TailleTypeService} from '../tailleType/tailleType.service';
import {TailleType} from '../tailleType/tailleType';
import {FamilleService} from '../familles/famille.service';
import {ProduitsFemmesComponent} from '../produitsFemmes/produitsFemmes.component';

@Component({
    moduleId: module.id,
    selector: 'ng-nav',
    templateUrl: 'nav.component.html'
})

export class NavbarComponent implements OnInit {
    membre_nom: string;
    quantiteTotale: number = 0;
    familleGlobalList: FamilleGlobal[];
    famillesList: Famille[];

    constructor(private authenticationService: AuthenticationService, private panierService: PanierService,
                private tailleTypeService: TailleTypeService, private familleService: FamilleService,
                private produitService: ProduitService, private familleGlobalService: FamilleGlobalService, private router: Router) {

    }


    ngOnInit(): void {
        this.getProduitByFamillesGlobales();

        if (this.hasAuthToken()) {
            this.setLogin();
        }

        $(window).scroll(function () {
            if (window.innerWidth > 1260) {
                if ($(this).scrollTop() > 120) {
                    document.getElementById('top-page-scroll').style.visibility = 'visible';
                    document.getElementById('top-barre').style.visibility = 'hidden';
                    document.getElementById('top-barre').style.position = 'static';
                }
                else {
                    document.getElementById('top-barre').style.position = 'static';
                    document.getElementById('top-page-scroll').style.visibility = 'hidden';
                    document.getElementById('top-barre').style.visibility = 'visible';
                }
            } else {

                document.getElementById('top-barre').style.position = 'fixed';
                document.getElementById('top-page-scroll').style.visibility = 'hidden';
                document.getElementById('top-barre').style.visibility = 'visible';
            }

        });

        $(window).resize(function () {
            if (window.innerWidth > 1260) {
                if ($(this).scrollTop() > 120) {
                    document.getElementById('top-page-scroll').style.visibility = 'visible';
                    document.getElementById('top-barre').style.visibility = 'hidden';
                    document.getElementById('top-barre').style.position = 'static';
                }
                else {
                    document.getElementById('top-barre').style.position = 'static';
                    document.getElementById('top-page-scroll').style.visibility = 'hidden';
                    document.getElementById('top-barre').style.visibility = 'visible';
                }
            } else {

                document.getElementById('top-barre').style.position = 'static';
                document.getElementById('top-page-scroll').style.visibility = 'hidden';
                document.getElementById('top-barre').style.visibility = 'visible';
            }

        });

        $('#top-icon').click(function (e) {
            e.preventDefault();
            $('body').toggleClass('sidebar');
        });

        $('#global-cache').click(function (e) {
            $('body').removeClass('sidebar');
        });

        $('.menu-dropdown').click(function (e) {
            $('body').removeClass('sidebar');
        });

        $(window).click(function (event) {
            if (!event.target.matches('.dropbtn')) {
                const dropdowns = document.getElementsByClassName('dropdown-content');
                let i;
                for (i = 0; i < dropdowns.length; i++) {
                    const openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        });
    }

    hasAuthToken() {
        return localStorage.getItem('id_token') !== null;
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['accueil']);
    }

    setLogin() {
        this.membre_nom = localStorage.getItem('membre_login');
    }

    dropdown() {
        document.getElementById('myDropdown').classList.toggle('show');
    }

    getProduitByFamillesGlobales(): void {
        this.familleGlobalService
            .getAllFamillesGlobal()
            .then(familleGlobal => {
                this.familleGlobalList = familleGlobal;
            });
    }

    reinitFamilleGlobal(): void {
        for (let i = 0; i < this.familleGlobalList.length; i++) {
            this.familleGlobalList[i].checked = false;
        }
    }

    afficherFamilleF(familleGlobale): void {
        this.getFamillesByFamilleGlobalAndFemme(familleGlobale.id);
        for (let i = 0; i < this.familleGlobalList.length; i++) {
            this.familleGlobalList[i].checked = false;
        }
        familleGlobale.checked = true;
    }

    afficherFamilleH(familleGlobale): void {
        this.getFamillesByFamilleGlobalAndHomme(familleGlobale.id);
        for (let i = 0; i < this.familleGlobalList.length; i++) {
            this.familleGlobalList[i].checked = false;
        }
        familleGlobale.checked = true;
    }

    getFamillesByFamilleGlobalAndFemme(familleGlobaleID): void {
        this.familleService
            .getFamilleByFamilleGlobalAndSexe('F', familleGlobaleID)
            .then(familles => {
                this.famillesList = familles;
            });
    }


    getFamillesByFamilleGlobalAndHomme(familleGlobaleID): void {
        this.familleService
            .getFamilleByFamilleGlobalAndSexe('M', familleGlobaleID)
            .then(familles => {
                this.famillesList = familles;
            });
    }

}


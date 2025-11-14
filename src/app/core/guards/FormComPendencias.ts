import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { ConfirmDialogComponent } from "src/app/shared/confirm-dialog/confirm-dialog.component";

export interface IFormComPendencias {
    podeDesativar(): boolean | Observable<boolean>;
}

@Injectable({ providedIn: 'root' })
export class PendenciasGuard implements CanDeactivate<IFormComPendencias> {
    constructor(private dialog: MatDialog) { }

    canDeactivate(
        component: IFormComPendencias,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot
    ): Observable<boolean> | boolean {
        
        if (component.podeDesativar()) return true;

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            disableClose: true, 
            hasBackdrop: true, 
            panelClass: 'custom-dialog-container',
            data: {
                titulo: 'Atenção!',
                mensagem: 'Você tem alterações não salvas. Deseja sair sem salvar?',
                confirmarLabel: 'Sair sem salvar',
                cancelarLabel: 'Continuar editando'
            }
        });
        return dialogRef.afterClosed();
    }
}
interface iTabButtons {
    id:number,
    value:string,
    color:string,
    fill:string
}

export class TabButtons {
    private numTabs:number;
    private tabDefault_id:number;
    private primaryColor:string='primary';
    private secondaryColor:string='light';
    private fillButton:string='solid';
    private tabButtons:iTabButtons[] = [];
    private tabSelected_id:number;
    private tabsValues:string[];

    constructor(numTabs:number, 
                tabDefault_id:number, 
                tabsValues:string[],
                primaryColor?:string, 
                secondaryColor?:string) {
        this.numTabs = numTabs;
        this.tabDefault_id = tabDefault_id;
        this.tabsValues = tabsValues;
        if ( primaryColor != null )
            this.primaryColor = primaryColor;
        if ( secondaryColor != null )
            this.secondaryColor = secondaryColor;
        this.initTabs();
    }

    private initTabs() {
        this.tabButtons = [];
        for ( var i=0; i<this.numTabs; i++) {
            var color = (this.tabDefault_id == i)? this.primaryColor : this.secondaryColor;
            var tab:iTabButtons;
            tab = {
                id:i,
                value:this.tabsValues[i],
                color:color,
                fill:this.fillButton
            }
            this.tabButtons.push(tab);
        };
        this.tabSelected_id = this.tabDefault_id;

    }

    selectTab(tabSelected_id) {
        this.tabSelected_id = tabSelected_id;
        for ( let index in this.tabButtons) {
            if ( this.tabButtons[index].id == tabSelected_id ) {
              this.tabButtons[index].color = this.primaryColor;
              this.tabButtons[index].fill = this.fillButton;
            }
            else {
              this.tabButtons[index].color = this.secondaryColor;
              this.tabButtons[index].fill = this.fillButton;
            }
        }
    }

    getTabButtons() {
        return this.tabButtons;
    }

    getTabSelected_id():number {
        return this.tabSelected_id;
    }
}